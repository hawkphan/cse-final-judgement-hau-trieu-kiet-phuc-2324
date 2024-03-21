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
    public class RegisteredList
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
               var query = await _context.Contests
                    .ProjectTo<ContestDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                int PageNumber = (request.Params.PageSize == -1) ? 1 : request.Params.PageNumber;
                int PageSize = (request.Params.PageSize == -1) ? query.Count : request.Params.PageSize;
                return Result<PagedList<ContestDto>>
                    .Success(PagedList<ContestDto>.CreateAsyncUsingList(query,
                        PageNumber, PageSize));
            }
        }
    }
}