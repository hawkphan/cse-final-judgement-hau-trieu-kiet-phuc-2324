using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Problems
{
    public class List
    {
        public class Query : IRequest<List<Problem>> { }
        public class Handler : IRequestHandler<Query, List<Problem>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }
            public async Task<List<Problem>> Handle(Query request, CancellationToken cancellationToken)
            {

                try
                {for (int i = 0; i < 2; i++)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(500    ,cancellationToken);
                    _logger.LogInformation($"Task {i} completed");
                }
                }
                catch(System.Exception)
                {
                    _logger.LogInformation("Task was cancelled");
                }

                return await _context.Problems.ToListAsync();
            }
        }
    }
}