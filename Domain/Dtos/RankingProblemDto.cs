using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class RankingProblemDto
    {
        public Guid ProblemId { get; set; }
        public string ProblemName { get; set; }
        public double Status { get; set; } // 0 - First to solve problem, 1 - Solved Problem, 2 - Attempted Problem , 3 - Pending Judgement
        public double Score { get; set; }
        public double MaxScore { get; set; }
        public int Order { get; set; }
        public int SubmissionCount { get; set; }
        public double TimeSpent { get; set; }
    }
}