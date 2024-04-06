using Application.Core;
using AutoMapper;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
                Judge0 judge0 = new Judge0();
                FileManager _fileManager = new FileManager();
                var solution = _mapper.Map<Solution>(request.SolutionDto);
                List<TestCase> testCases = _context.TestCases
                .Where(tc => tc.ProblemId == request.SolutionDto.problemId)
                .ToList();
                foreach (TestCase testCase in testCases)
                {
                    if (!File.Exists(Path.Combine(_fileManager.CurrentDirectory, testCase.Input)))
                    {
                        return ApiResult<Solution>.Failure(new string[] { "Test case not exist in server" });
                    }
                }
                var content = request.SolutionDto.solution;

                Guid solutionId = Guid.NewGuid();
                solution.Id = solutionId;
                var path = _fileManager.WriteAndSaveSolutions(content, solution.Id.ToString(), "txt");
                ResultDto result;
                ResultDto resultDto;
                Result result;
                foreach (TestCase testCase in testCases)
                {
                    Judge0ResultDto requestDto = new Judge0ResultDto
                    {
                        Content = request.SolutionDto.solution,
                        LanguageId = request.SolutionDto.languageId,
                        Input = _fileManager.getTestCaseContent(testCase.Input),
                        ExpectedOutput = _fileManager.getTestCaseContent(testCase.Output)
                    };
                    var jsonContent = JsonConvert.SerializeObject(requestDto);
                    string jsonRespond = await judge0.SendPostRequest("submissions/?base64_encoded=false&wait=true", jsonContent);
                    resultDto = JsonConvert.DeserializeObject<ResultDto>(jsonRespond);
                    result = _mapper.Map<ResultDto>(resultDto);
                
                }
                _context.Solutions.Add(solution);
                return ApiResult<Solution>.Success(solution);

            }


        }
    }
}
// var requestBody = new Dictionary<string, string>{
//         { "source_code", request.SolutionDto.solution },
//         { "language_id",request.SolutionDto.languageId+"" },
//         { "stdin", _fileManager.getTestCaseContent(testCase.Input) },
//         { "expected_output", _fileManager.getTestCaseContent(testCase.Input) }
// };