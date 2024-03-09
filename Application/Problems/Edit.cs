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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ApiResult<ProblemDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var problem = await _context.Problems.FindAsync(request.Problem.Id);

                if (problem == null) return null;
                if (request.TestCaseZip != null)
                {
                    FileManager fileManager = new FileManager();
                    await fileManager.SaveAndExtractZipFile(request.TestCaseZip, request.Problem.Code);
                    var testCaseLocation = Path.Combine("TestCases", request.Problem.Code);
                    String[] files = fileManager.getFileNameInFolder(testCaseLocation, "*.in");
                    foreach (var inputPath in files)
                    {
                        var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(inputPath);
                        TestCase testCase = new TestCase();
                        testCase.Input = Path.Combine(testCaseLocation, $"{fileNameWithoutExtension}.in");
                        testCase.Output = Path.Combine(testCaseLocation, $"{fileNameWithoutExtension}.out");
                        request.Problem.TestCases.Add(testCase);
                    }
                }



                if (request.Problem.TestCases.Count == 0)
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

                _mapper.Map(request.Problem, problem);

                var ApiResult = await _context.SaveChangesAsync() > 0;

                if (!ApiResult)
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Edit" });
                }
                var newProblemDto = _mapper.Map<ProblemDto>(request.Problem);

                return ApiResult<ProblemDto>.Success(newProblemDto);
            }
        }
    }
}