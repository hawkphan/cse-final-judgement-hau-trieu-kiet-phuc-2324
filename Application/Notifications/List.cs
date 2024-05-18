using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;

namespace Application.Notifications
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Notification>>>
        {
            public Guid UserId { get; set; }
            public PagingParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<Notification>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<PagedList<Notification>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var query = await _context.Notifications.Include(r => r.Sender).Include(r => r.Receiver).Where(r => r.ReceiverId == request.UserId).ToListAsync();

                query = query.OrderByDescending(r => r.Timestamp).ToList();

                int PageNumber = (request.Params.PageNumber == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageNumber == -1) ? query.Count : request.Params.PageSize;

                return Result<PagedList<Notification>>
                    .Success(PagedList<Notification>.CreateAsyncUsingList(query,
                        PageNumber, PageSize));
            }
        }
    }
}