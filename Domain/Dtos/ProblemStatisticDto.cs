using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class ProblemStatisticDto
    {
        public int TotalProblems { get; set; }
        public int TotalSolvedProblems { get; set; }
        public ICollection<DifficultyStatistic>  DifficultyStatistics { get; set; } = new List<DifficultyStatistic>();
    }

    public class DifficultyStatistic
    {
        public int Difficulty { get; set; }
        public int TotalProblems {get; set; }
        public int TotalSolved { get; set; }
    }
}