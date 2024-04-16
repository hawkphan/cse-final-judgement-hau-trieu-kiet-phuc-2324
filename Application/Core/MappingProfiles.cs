using AutoMapper;
using Domain;
using Domain.Dtos;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Problem, Problem>();
            CreateMap<Domain.AppUser, AppUser>();
            CreateMap<Solution, Solution>();
            CreateMap<Result, Result>();

            CreateMap<SolutionRequestDto, Solution>()
                .ForMember(d => d.LanguageId, o => o.MapFrom(s => s.languageId))
                .ForMember(d => d.ProblemId, o => o.MapFrom(s => s.problemId))
            ;
            CreateMap<Solution, SolutionRespondDto>();

            CreateMap<Problem, ProblemDto>()
            .ForMember(dest => dest.Languages, opt => opt.MapFrom(src => src.ProblemLanguages.Select(pl => pl.Language)));
            CreateMap<Language, LanguageDto>()
              .ForMember(d => d.Name, o => o.MapFrom(s => s.Name))
              .ForMember(d => d.Id, o => o.MapFrom(s => s.Id));
            CreateMap<ResultDto, Result>()
                .ForMember(d => d.ExecutionTime, o => o.MapFrom(s => s.Time))
                .ForMember(d => d.Output, o => o.MapFrom(s => s.Stdout))
                .ForMember(d => d.MemoryUsage, o => o.MapFrom(s => s.Memory))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.Id))
                .ForMember(d => d.StatusMessage, o => o.MapFrom(s => s.Status.Description));

            CreateMap<AppUser, ProfileDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.LastName))
                .ForMember(d => d.Gender, o => o.MapFrom(s => s.Gender))
                .ForMember(d => d.Birthday, o => o.MapFrom(s => s.Birthday))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Email))
            ;
            CreateMap<Domain.Contest, ContestDto>()
              .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
              .ForMember(d => d.Title, o => o.MapFrom(s => s.Title))
              .ForMember(d => d.StartTime, o => o.MapFrom(s => s.StartTime))
              .ForMember(d => d.EndTime, o => o.MapFrom(s => s.EndTime))
              .ForMember(d => d.Members, o => o.MapFrom(s => s.Members))
              .ForMember(d => d.Description, o => o.MapFrom(s => s.Description))
              .ForMember(d => d.Problems, o => o.MapFrom(s => s.Problems));
        }
    }
}