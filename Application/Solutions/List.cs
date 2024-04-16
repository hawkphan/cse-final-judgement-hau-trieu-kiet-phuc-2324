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
        public class Query : IRequest<Result<PagedList<Solution>>>
        {
            public Guid? UserId { get; set; }
            public Guid? ProblemId { get; set; }
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<Solution>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<Solution>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Judge0 judge0 = new Judge0();
                String resultJson;
                Guid? problemId = request.ProblemId;
                Guid? userId = request.UserId;
                var AllResult = _context.Results.Where(r => r.Status == 1 || r.Status == 2).ToList();

                foreach (var result in AllResult)
                {
                    if (result.Status == 1 || result.Status == 2)
                    {
                        string initialResult = await judge0.SendGetRequest($"submissions/{result.Token}");
                        ResultDto resultDto = JsonConvert.DeserializeObject<ResultDto>(initialResult);
                        var newresult = _mapper.Map<Result>(resultDto);

                        newresult.Id = result.Id;
                        newresult.TestCaseId = result.TestCaseId;
                        newresult.SolutionId = result.SolutionId;

                        _mapper.Map(newresult, result);
                        await _context.SaveChangesAsync();
                    }
                }

                var solutions = _context.Solutions.Include(s => s.Results).ThenInclude(r => r.TestCase).AsQueryable();
                foreach (var solution in solutions)
                {
                    solution.Results = solution.Results.OrderBy(r => r.TestCase.Name).ToList();
                }
                if (userId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                }

                if (problemId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.ProblemId == problemId);
                }

                var queryList = await solutions.OrderByDescending(s => s.CreatedDate).ToListAsync();


                int PageNumber = (request.Params.PageSize == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageSize == -1) ? queryList.Count : request.Params.PageSize;

                return Result<PagedList<Solution>>
                    .Success(PagedList<Solution>.CreateAsyncUsingList(queryList,
                        PageNumber, PageSize));
            }
        }
    }
}