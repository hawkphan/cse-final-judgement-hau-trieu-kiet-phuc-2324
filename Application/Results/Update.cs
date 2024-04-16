using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using Application.Core;
using Domain.Dtos;
using Newtonsoft.Json;

namespace Application.Results
{
    public class Update
    {
        public class Command : IRequest<ApiResult<ResultDto>>
        {
            public String ResultId;
        }

        public class Handler : IRequestHandler<Command, ApiResult<ResultDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ApiResult<ResultDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                Judge0 judge0 = new Judge0();
                Guid id = new Guid(request.ResultId);
                var result = await _context.Results.FindAsync(id);
                string initialResult = await judge0.SendGetRequest($"submissions/{result.Token}");
                ResultDto resultDto = JsonConvert.DeserializeObject<ResultDto>(initialResult);
                var newresult = _mapper.Map<Result>(resultDto);

                newresult.Id = id;
                newresult.TestCaseId = result.TestCaseId;
                newresult.SolutionId = result.SolutionId;

                _mapper.Map(newresult, result);

                var Success = await _context.SaveChangesAsync() > 0;
                if (Success)
                {
                    return ApiResult<ResultDto>.Success(resultDto);
                }
                else
                {
                    return ApiResult<ResultDto>.Failure(new string[] { "Failed to get Result" });
                }
            }
        }
    }
}
