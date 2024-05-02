using Application.Core;
using Application.Solutions;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Problems
{
    public class Edit
    {
        public class Command : IRequest<ApiResult<ProblemDto>>
        {
            public Problem Problem { get; set; }
            public string AllowedLanguages { get; set; }
            public IFormFile? TestCaseZip { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Problem).SetValidator(new ProblemValidator());
            }
        }

        public class Handler : IRequestHandler<Command, ApiResult<ProblemDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ApiResult<ProblemDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var problem = await _context.Problems.FindAsync(request.Problem.Id);

                    if (problem == null) return null;
                    if (request.TestCaseZip != null && request.TestCaseZip.Length > 0)
                    {
                        FileManager fileManager = new FileManager();
                        await fileManager.SaveAndExtractZipFile(request.TestCaseZip, request.Problem.Code);
                        var testCaseLocation = Path.Combine("Uploads\\TestCases", request.Problem.Code);
                        String[] files = fileManager.getFileNameInFolder(testCaseLocation, "*.in");
                        ICollection<TestCase> testCases = new List<TestCase>();
                        foreach (var inputPath in files)
                        {
                            var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(inputPath);
                            TestCase testCase = new TestCase
                            {
                                Input = Path.Combine(testCaseLocation, $"{fileNameWithoutExtension}.in"),
                                Output = Path.Combine(testCaseLocation, $"{fileNameWithoutExtension}.out"),
                                Name = fileNameWithoutExtension,
                            };
                            testCases.Add(testCase);
                        }
                        request.Problem.TestCases = testCases;
                    }
                    if (request.Problem.TestCases == null)
                    {
                        request.Problem.TestCases = problem.TestCases;
                    }
                    else
                    {
                        var testCasesToRemove = _context.TestCases
                        .Where(tc => tc.ProblemId == request.Problem.Id)
                        .ToList();

                        // Remove the retrieved test cases
                        _context.TestCases.RemoveRange(testCasesToRemove);

                        // Save changes to the database
                        await _context.SaveChangesAsync();
                    }

                    request.Problem.Date = problem.Date;
                    request.Problem.Difficulty = problem.Difficulty;

                    var languageIds = request.AllowedLanguages?.Split(',')?.Select(Int32.Parse)?.ToList();
                    ProblemLanguage language;
                    List<ProblemLanguage> problemLanguages = new List<ProblemLanguage>();

                    var languagesToDelete = _context.ProblemLanguages.Where(l => l.ProblemId == request.Problem.Id).ToList();
                    _context.ProblemLanguages.RemoveRange(languagesToDelete);

                    foreach (int i in languageIds)
                    {
                        language = new ProblemLanguage();
                        language.LanguageId = i;
                        problemLanguages.Add(language);
                    }
                    request.Problem.ProblemLanguages = problemLanguages;

                    _mapper.Map(request.Problem, problem);
                    await _context.SaveChangesAsync();


                    var newProblemDto = _mapper.Map<ProblemDto>(request.Problem);

                    return ApiResult<ProblemDto>.Success(newProblemDto);
                }
                catch
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Edit" });
                }
            }
        }
    }
}