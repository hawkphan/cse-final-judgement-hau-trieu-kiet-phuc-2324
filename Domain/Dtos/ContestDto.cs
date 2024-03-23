using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class ContestDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public ICollection<ContestMember> Members { get; set; }
        public ICollection<ContestProblem> Problems { get; set; }
        public ICollection<Guid> ProblemIds { get; set; }
    }
}