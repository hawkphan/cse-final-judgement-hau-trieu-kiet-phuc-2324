using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Domain
{
    public class SolutionResponseDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        // public AppUser User { get; set; }
        public Guid ProblemId { get; set; }
        public Guid? ContestId { get; set; }
        public string Source { get; set; } = "Not Available, Probably Deleted or not exist";
        public int LanguageId { get; set; }
        public double Status { get; set; }
        public long MemoryUsage { get; set; } = 0;
        public double ExecutionTime { get; set; } = 0;
        public DateTime CreatedDate { get; set; }
        public double Score { get; set; }
    }
}