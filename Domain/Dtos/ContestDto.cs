using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class ContestDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double Rule { get; set; }  // 0 for ACM/ICPC, 1 for Olympic
        public double Type { get; set; } // 0 for Public, 1 for Private
        public ICollection<ContestMemberDto> Members { get; set; }
        public ICollection<ContestProblemDto> Problems { get; set; }
        public bool Succeeded { get; set; }
        public ICollection<string> Errors { get; set; }
    }
}