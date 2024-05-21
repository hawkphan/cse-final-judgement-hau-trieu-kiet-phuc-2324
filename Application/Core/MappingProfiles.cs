using AutoMapper;
using Domain;
using Domain.Dtos;
using Microsoft.AspNetCore.SignalR;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Solution, Solution>();
            CreateMap<Result, Result>();

            CreateMap<SolutionRequestDto, Solution>()
                .ForMember(d => d.LanguageId, o => o.MapFrom(s => s.LanguageId))
                .ForMember(d => d.ProblemId, o => o.MapFrom(s => s.ProblemId))
                .ForMember(d => d.ContestId, o => o.MapFrom(s => s.ContestId))

            ;
            CreateMap<Solution, SolutionResponseDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status));

            CreateMap<Problem, ProblemDto>()
                .ForMember(d => d.ProblemLanguages, o => o.MapFrom(s => s.ProblemLanguages))
                .ForMember(d => d.PrivacyStatus, o => o.MapFrom(s => s.PrivacyStatus));
            CreateMap<ProblemDto, Problem>()
                .ForMember(d => d.ProblemLanguages, o => o.MapFrom(s => s.ProblemLanguages))
                .ForMember(d => d.PrivacyStatus, o => o.MapFrom(s => s.PrivacyStatus));
            CreateMap<ProblemLanguage, ProblemLanguageDto>()
                .ForMember(d => d.LanguageId, o => o.MapFrom(s => s.LanguageId));
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
            CreateMap<AppUser, RankUserDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.Elo, o => o.MapFrom(s => s.Rating))

                ;
            CreateMap<ContestDto, Domain.Contest>()
              .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
              .ForMember(d => d.Name, o => o.MapFrom(s => s.Name))
              .ForMember(d => d.StartTime, o => o.MapFrom(s => s.StartTime))
              .ForMember(d => d.EndTime, o => o.MapFrom(s => s.EndTime))
              .ForMember(d => d.Rule, o => o.MapFrom(s => s.Rule))
              .ForMember(d => d.Type, o => o.MapFrom(s => s.Rule))
              .ForMember(d => d.Description, o => o.MapFrom(s => s.Description))
              .ForMember(d => d.Problems, o => o.MapFrom(s => s.Problems))
              .ForMember(d => d.Members, o => o.MapFrom(s => s.Members));


            CreateMap<ContestMemberDto, ContestMember>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.ContestId, o => o.MapFrom(s => s.ContestId))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.UserId))
            .ForMember(d => d.Role, o => o.MapFrom(s => s.Role));

            CreateMap<ContestProblemDto, ContestProblem>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.ContestId, o => o.MapFrom(s => s.ContestId))
            .ForMember(d => d.ProblemId, o => o.MapFrom(s => s.ProblemId))
            .ForMember(d => d.Score, o => o.MapFrom(s => s.Score))
            .ForMember(d => d.Order, o => o.MapFrom(s => s.Order));

            CreateMap<Domain.Contest, ContestDto>()
              .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
              .ForMember(d => d.Name, o => o.MapFrom(s => s.Name))
              .ForMember(d => d.StartTime, o => o.MapFrom(s => s.StartTime))
              .ForMember(d => d.EndTime, o => o.MapFrom(s => s.EndTime))
              .ForMember(d => d.Rule, o => o.MapFrom(s => s.Rule))
              .ForMember(d => d.Type, o => o.MapFrom(s => s.Rule))
              .ForMember(d => d.Description, o => o.MapFrom(s => s.Description))
              .ForMember(d => d.Problems, o => o.MapFrom(s => s.Problems))
              .ForMember(d => d.Members, o => o.MapFrom(s => s.Members));

            CreateMap<ContestMember, ContestMemberDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.ContestId, o => o.MapFrom(s => s.ContestId))
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.UserId))
            .ForMember(d => d.Role, o => o.MapFrom(s => s.Role));

            CreateMap<ContestProblem, ContestProblemDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.ContestId, o => o.MapFrom(s => s.ContestId))
            .ForMember(d => d.ProblemId, o => o.MapFrom(s => s.ProblemId))
            .ForMember(d => d.Score, o => o.MapFrom(s => s.Score))
            .ForMember(d => d.Order, o => o.MapFrom(s => s.Order));

        }
    }
}