using Application.Core;
using Application.Interfaces;
using Application.Solutions;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Problems
{
    public class Create
    {
        public class Command : IRequest<ApiResult<ProblemDto>>
        {
            public Problem Problem { get; set; }
            public String AllowedLanguages { get; set; }
            public IFormFile TestCaseZip { get; set; }
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
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<ApiResult<ProblemDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (request.TestCaseZip == null || request.TestCaseZip.Length == 0)
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Create, Test Case is Empty" });
                }
                var languageIds = request.AllowedLanguages?.Split(',')?.Select(Int32.Parse)?.ToList();
                ProblemLanguage language;
                List<ProblemLanguage> problemLanguages = new List<ProblemLanguage>();
                foreach (int i in languageIds)
                {
                    language = new ProblemLanguage();
                    language.LanguageId = i;
                    problemLanguages.Add(language);
                }
                request.Problem.ProblemLanguages = problemLanguages;
                request.Problem.User = user;
                request.Problem.Date = DateTime.UtcNow;
                request.Problem.Difficulty = Math.Max(1000, request.Problem.Difficulty);


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
                        Name = fileNameWithoutExtension
                    };
                    testCases.Add(testCase);
                }
                request.Problem.TestCases = testCases;

                _context.Problems.Add(request.Problem);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Create" });
                }
                // Instead of creating problemsQuery, you can directly use request.Problem here
                var newProblemDto = _mapper.Map<ProblemDto>(request.Problem);

                return ApiResult<ProblemDto>.Success(newProblemDto);
            }

        }
    }
}