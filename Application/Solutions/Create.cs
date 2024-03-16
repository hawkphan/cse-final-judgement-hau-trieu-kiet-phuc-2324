using Application.Compiler;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Solutions
{
    public class Create
    {
        public class Command : IRequest<ApiResult<Solution>>
        {
            public SolutionDto SolutionDto { get; set; }
        }
        public class Handler : IRequestHandler<Command, ApiResult<Solution>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<ApiResult<Solution>> Handle(Command request, CancellationToken cancellationToken)
            {
                ICompiler _compiler;
                FileManager _fileManager;
                // var solution = new Solution();
                var solution = _mapper.Map<Solution>(request.SolutionDto);
                var testCases = _context.TestCases
                .Where(tc => tc.ProblemId == request.SolutionDto.problemId)
                .ToList();
                var content = request.SolutionDto.solution;
                solution.FileName = "none";


                Guid solutionId = Guid.NewGuid();
                solution.Id = solutionId;


                var fileExtension = solution.Language.FileExtension;
                _fileManager = new FileManager();
                var path = _fileManager.WriteAndSaveSolutions(content, solution.Id.ToString(), fileExtension);
                List<Result> solutionResult;

                var problem = _context.Problems.Find(request.SolutionDto.problemId);
                switch (fileExtension)
                {
                    case "java":
                        break;
                    case "py":
                        _compiler = new PythonCompiler();
                        solutionResult = _compiler.Compile(path, testCases, problem);
                        foreach (Result result in solutionResult)
                        {
                            solution.MemoryUsage += result.MemoryUsage;
                            solution.ExecutionTime += result.ExecutionTime;
                        }
                        solution.Results = solutionResult;
                        break;
                }
                _context.Solutions.Add(solution);
                await _context.SaveChangesAsync();


                return ApiResult<Solution>.Success(solution);

            }


        }
    }
}