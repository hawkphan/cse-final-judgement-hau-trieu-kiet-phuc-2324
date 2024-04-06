using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Languages
{
    public class Details
    {
        public class Query : IRequest<LanguageDto>
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, LanguageDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<LanguageDto> Handle(Query request, CancellationToken cancellationToken)
            {
                Judge0 judge0 = new Judge0();
                var languageEntity = await _context.Languages.FindAsync(request.Id);
                var languageDto = _mapper.Map<LanguageDto>(languageEntity);
                return languageDto;
            }
        }
    }
}