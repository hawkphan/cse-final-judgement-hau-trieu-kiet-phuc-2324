using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class ContestProblemDto
    {
        public Guid Id { get; set; }
        public Guid ContestId { get; set; }
        public Guid ProblemId { get; set; }
        public double Score { get; set; }
        public int Order { get; set; }
    }
}