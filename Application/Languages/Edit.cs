using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Languages
{
    public class Edit
    {
        public class Command : IRequest<ApiResult<Unit>>
        {
            public Language Language { get; set; }
        }

       public class Handler : IRequestHandler<Command, ApiResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ApiResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var Language = await _context.Languages.FindAsync(request.Language.Id);
                
                _mapper.Map(request.Language, Language);

                var result  = await _context.SaveChangesAsync()>0;
                if (result)
                {
                    return ApiResult<Unit>.Success(Unit.Value);
                }
                else
                {
                    return ApiResult<Unit>.Failure(new string[] {"Failed to Add"});
                }
            }
        }
    }
}
