using Application.Core;
using Application.Solutions;
using AutoMapper;
using Domain;
using Domain.Dtos;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Contests
{
    public class Edit
    {
        public class Command : IRequest<ApiResult<ContestDto>>
        {
            public Domain.Contest Contest { get; set; }
        }
        public class Handler : IRequestHandler<Command, ApiResult<ContestDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ApiResult<ContestDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}