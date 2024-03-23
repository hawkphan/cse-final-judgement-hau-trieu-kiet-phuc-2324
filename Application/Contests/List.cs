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
        public static implicit operator List<object>(List v)
        {
            throw new NotImplementedException();
        }

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
               throw new NotImplementedException();
            }
        }
    }
}