using System.Text.Json.Nodes;
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
            public SolutionRequestDto SolutionRequestDto { get; set; }
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
                Problem problem = await _context.Problems.FirstOrDefaultAsync(p => p.Id == request.SolutionRequestDto.problemId);
                Judge0 judge0 = new Judge0();
                FileManager _fileManager = new FileManager();
                Solution solution = _mapper.Map<Solution>(request.SolutionRequestDto);
                List<TestCase> testCases = _context.TestCases
                .Where(tc => tc.ProblemId == request.SolutionRequestDto.problemId)
                .ToList();
                foreach (TestCase testCase in testCases)
                {
                    if (!File.Exists(Path.Combine(_fileManager.CurrentDirectory, testCase.Input)))
                    {
                        return ApiResult<Solution>.Failure(new string[] { "Test case not exist in server" });
                    }
                }
                var content = request.SolutionRequestDto.solution;

                Guid solutionId = Guid.NewGuid();
                solution.Id = solutionId;
                var path = _fileManager.WriteAndSaveSolutions(content, solution.Id.ToString(), "txt");
                ResultDto resultDto;
                Result result;
                Judge0ResultDto requestDto;
                foreach (TestCase testCase in testCases)
                {
                    // memory relating is kilobytes
                    requestDto = new Judge0ResultDto
                    {
                        Content = request.SolutionRequestDto.solution,
                        LanguageId = request.SolutionRequestDto.languageId,
                        Input = _fileManager.getTestCaseContent(testCase.Input),
                        ExpectedOutput = _fileManager.getTestCaseContent(testCase.Output),

                        TimeLimit = Math.Min(problem.TimeLimit, 15),
                        ExtraTime = (float)0.5,
                        WallTimeLimit = Math.Min(problem.TimeLimit + 1, 20),
                        MemoryLimit = Math.Min(problem.MemoryLimit, 64000),
                        StackLimit = 128000,
                        EnableMemoryLimit = true,
                        EnableTimeLimit = true,
                    };


                    var jsonContent = JsonConvert.SerializeObject(requestDto);
                    // write into json file for easy test with postman
                    _fileManager.WriteAndSaveSolutions(jsonContent, solution.Id.ToString(), "json.txt");

                    string jsonRespond = await judge0.SendPostRequest("submissions/?base64_encoded=false&wait=false", jsonContent);
                    String ResultToken = (string)JsonNode.Parse(jsonRespond)["token"];

                    string initialResult = await judge0.SendGetRequest($"submissions/{ResultToken}");
                    resultDto = JsonConvert.DeserializeObject<ResultDto>(initialResult);
                    result = _mapper.Map<Result>(resultDto);

                    result.TestCaseId = testCase.Id;
                    result.SolutionId = solutionId;

                    solution.Results.Add(result);
                }

                solution.LanguageId = request.SolutionRequestDto.languageId;
                solution.CreatedDate = DateTime.Now;
                _context.Solutions.Add(solution);
                await _context.SaveChangesAsync();
                return ApiResult<Solution>.Success(solution);

            }


        }
    }
}
