using AutoMapper;
using Domain;
using Domain.Dtos;

namespace Application.Core
{
    public class ContestProblemListMapper : ITypeConverter<List<ContestProblem>, List<ContestProblemDto>>
    {
        public List<ContestProblemDto> Convert(List<ContestProblem> source, List<ContestProblemDto> destination, ResolutionContext context)
        {
            return context.Mapper.Map<List<ContestProblemDto>>(source);
        }
    }
}