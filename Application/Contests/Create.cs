using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contests
{
    public class Create
    {
        public class Command : IRequest
        {
            public Domain.Contest Contest { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Contests.Add(request.Contest);

                await _context.SaveChangesAsync();
            }

        }
    }
}