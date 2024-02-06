using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            CreateMap<Problem, ProblemDto>()
            .ForMember(dest => dest.Languages, opt => opt.MapFrom(src => src.ProblemLanguages.Select(pl => pl.Language)));
            CreateMap<Language, LanguageDto>()
              .ForMember(d => d.Name, o => o.MapFrom(s => s.Name));

            CreateMap<AppUser, Domain.Profile>()
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.LastName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.IsFemale, o => o.MapFrom(s => s.IsFemale))
                .ForMember(d => d.Birthday, o => o.MapFrom(s => s.Birthday))
            ;
        }
    }
}