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
        public string FileName { get; set; }
        public Guid LanguageId { get; set; }
        public Language Language { get; set; }
        public double Status { get; set; }
        public long MemoryUsage { get; set; } = 0;
        public double ExecutionTime { get; set; } = 0;
        public DateTime CreatedDate { get; set; }
        public ICollection<Result> Results { get; set; }
        public double Score { get; set; }
    }

}