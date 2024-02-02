using AutoMapper;
using Domain;
using Application.Problems;
using Application.Activities;
namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Problem, ProblemDto>();

        }
    }
}