using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Contest
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double Status { get; set; } // 0 for Not Started Yet, 1 for Started, 2 for Ended
        public double Rule { get; set; }  // 0 for ACM/ICPC, 1 for Olympic
        public double Type { get; set; } // 0 for Public, 1 for Private
        public ICollection<ContestMember> Members { get; set; }
        public ICollection<ContestProblem> Problems { get; set; }
        public ICollection<Solution> Solutions { get; set; }
    }
}