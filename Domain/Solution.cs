using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Solution
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public Guid ProblemId { get; set; }
        public Problem Problem { get; set; }
        public int LanguageId { get; set; }
        public double Status { get; set; }
        public long MemoryUsage { get; set; } = 0;
        public double ExecutionTime { get; set; } = 0;
        public DateTime CreatedDate { get; set; }
        public ICollection<Result> Results { get; set; } = new List<Result>();
        public double Score { get; set; }
    }

}