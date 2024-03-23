using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain.Dtos;
using Domain;
using MediatR;
using Persistence;

namespace Application.Contests
{
    public class Create
    {
        public class Command : IRequest<ApiResult<ContestDto>>
        {
            public Domain.Contest Contest { get; set; }
        }
        public class Handler : IRequestHandler<Command, ApiResult<ContestDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<ApiResult<ContestDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }

        }
    }
}