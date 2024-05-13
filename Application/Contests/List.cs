using System.ComponentModel;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contests
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ContestDto>>>
        {
            public PagingParams Params { get; set; }
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ContestDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<ContestDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                string key = request.Params.Keywords;
                Guid? userId = request.UserId;

                var contestIds = new List<Guid>();

                var contestMembers = _context.ContestMembers.Include(c => c.Contest).AsQueryable();

                if (userId != null)
                {
                    contestMembers = contestMembers.Where(m => m.UserId.Equals(userId) && Math.Abs(m.Role - 0) < 0.0000001).AsQueryable();
                }

                foreach (var item in contestMembers)
                {
                    contestIds.Add(item.ContestId);
                }

                var contests = _context.Contests.AsQueryable<Domain.Contest>();

                if (!string.IsNullOrEmpty(key))
                {
                    contests = contests.
                    Where(contest =>
                    contest.Name.Contains(key));
                }

                if (userId != null)
                {
                    contests = contests.
                    Where(contest =>
                    contestIds.Contains(contest.Id));
                }

                var query = await contests.ProjectTo<ContestDto>(_mapper.ConfigurationProvider)
                     .ToListAsync(cancellationToken: cancellationToken);

                foreach (var item in query)
                {
                    item.StartTime = item.StartTime.AddHours(7);
                    item.EndTime = item.EndTime.AddHours(7);
                }

                int PageNumber = (request.Params.PageNumber == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageNumber == -1) ? query.Count : request.Params.PageSize;
                return Result<PagedList<ContestDto>>
                    .Success(PagedList<ContestDto>.CreateAsyncUsingList(query,
                        PageNumber, PageSize));
            }
        }
    }
}