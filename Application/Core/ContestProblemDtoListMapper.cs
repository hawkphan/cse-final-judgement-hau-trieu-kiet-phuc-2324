using AutoMapper;
using Domain;
using Domain.Dtos;

namespace Application.Core
{
    public class ContestProblemDtoListMapper : ITypeConverter<List<ContestProblemDto>, List<ContestProblem>>
    {
        public List<ContestProblem> Convert(List<ContestProblemDto> source, List<ContestProblem> destination, ResolutionContext context)
        {
            return context.Mapper.Map<List<ContestProblem>>(source);
        }
    }
}