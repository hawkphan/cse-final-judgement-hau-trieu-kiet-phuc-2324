using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;

namespace Application.Solutions
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<SolutionResponseDto>>>
        {
            public Guid? UserId { get; set; }
            public Guid? ProblemId { get; set; }
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<SolutionResponseDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<SolutionResponseDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Judge0 judge0 = new Judge0();
                Guid? problemId = request.ProblemId;
                Guid? userId = request.UserId;

                var results = _context.Results.Where(r => r.Status == 1 || r.Status == 2).ToList();

                foreach (var result in results)
                {
                    if (result.Status < 3)
                    {
                        string initialResult = await judge0.SendGetRequest($"submissions/{result.Token}");
                        ResultDto resultDto = JsonConvert.DeserializeObject<ResultDto>(initialResult);
                        var newResult = _mapper.Map<Result>(resultDto);

                        newResult.Id = result.Id;
                        newResult.TestCaseId = result.TestCaseId;
                        newResult.SolutionId = result.SolutionId;

                        _mapper.Map(newResult, result);
                        await _context.SaveChangesAsync();
                    }
                }

                var solutions = _context.Solutions.Include(s => s.Results).AsQueryable();

                foreach (var solution in solutions)
                {
                    double sevStatus = 0;
                    double runTime = 0;
                    long memory = 0;
                    foreach (var result in solution.Results)
                    {
                        if (result.MemoryUsage != null && result.ExecutionTime != null)
                        {
                            memory = long.Max((long)result.MemoryUsage, memory);
                            runTime = double.Max((double)result.ExecutionTime, runTime);
                        }

                        if (result.Status == 1)
                        {
                            sevStatus = 1;
                            break;
                        }

                        if (result.Status == 2)
                        {
                            sevStatus = 2;
                            break;
                        }

                        sevStatus = double.Max(sevStatus, result.Status);
                    }
                    solution.ExecutionTime = runTime;
                    solution.MemoryUsage = memory;
                    solution.Status = sevStatus;
                }

                await _context.SaveChangesAsync();

                if (userId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                }

                if (problemId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.ProblemId == problemId);
                }

                var queryList = await solutions.ProjectTo<SolutionResponseDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(s => s.CreatedDate)
                .ToListAsync(cancellationToken: cancellationToken);


                int PageNumber = (request.Params.PageSize == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageSize == -1) ? queryList.Count : request.Params.PageSize;

                return Result<PagedList<SolutionResponseDto>>
                    .Success(PagedList<SolutionResponseDto>.CreateAsyncUsingList(queryList,
                        PageNumber, PageSize));
            }
        }
    }
}