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

                    if (languageIds != null)
                    {
                        var languagesToDelete = _context.ProblemLanguages.Where(l => l.ProblemId == request.Problem.Id).ToList();
                        _context.ProblemLanguages.RemoveRange(languagesToDelete);

                        List<ProblemLanguage> problemLanguages = new List<ProblemLanguage>();
                        foreach (int languageId in languageIds)
                        {
                            var language = new ProblemLanguage
                            {
                                LanguageId = languageId,
                                ProblemId = problem.Id // Set the relationship
                            };
                            problemLanguages.Add(language);
                        }
                        problem.ProblemLanguages = problemLanguages;
                    }

                    _mapper.Map(request.Problem, problem);

                    problem.Code = request.Problem.Code;
                    problem.Description = request.Problem.Description;
                    problem.Title = request.Problem.Title;
                    problem.PrivacyStatus = request.Problem.PrivacyStatus;
                    problem.MemoryLimit = request.Problem.MemoryLimit;
                    problem.TimeLimit = request.Problem.TimeLimit;
                    problem.GradeMode = request.Problem.GradeMode;
                    problem.ApproximateRate = request.Problem.ApproximateRate;

                    var result = await _context.SaveChangesAsync();

                    if (result == 0)
                    {
                        return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Edit" });
                    }

                    var newProblemDto = _mapper.Map<ProblemDto>(request.Problem);

                    return ApiResult<ProblemDto>.Success(newProblemDto);
                }
                catch (Exception ex)
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { ex.Message });
                }
            }
        }
    }
}