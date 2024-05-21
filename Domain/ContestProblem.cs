using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ContestProblem
    {
        [Key]
        public Guid Id { get; set; }
        public Guid ContestId { get; set; }
        public Contest Contest { get; set; }
        public Guid ProblemId { get; set; }
        public Problem Problem { get; set; }
        public double Score { get; set; }
        public int Order { get; set; }
    }
}