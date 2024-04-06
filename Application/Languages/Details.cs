using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Newtonsoft.Json;
using Persistence;
using System.Net;

namespace Application.Languages
{
    public class Details
    {
        public class Query : IRequest<LanguageDto>
        {
            public int Id { get; set; }

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
                var languageEntity = await judge0.SendGetRequest(judge0.LanguageParam() + "/" + request.Id);
                var languageDto = JsonConvert.DeserializeObject<LanguageDto>(languageEntity);
                return languageDto;
            }
        }
    }
}