using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class SubmissionStatisticDto
    {
        public int totalSubmissions { get; set; }
        public int totalSolvedSubmissions { get; set; }
        public ICollection<DifficultyStatistic>  collectionDifficultyStatistic { get; set; } = new List<DifficultyStatistic>();
    }

    public class DifficultyStatistic
    {
        public double difficulty { get; set; }
        public int totalSubmissions {get; set; }
        public int totalSolved { get; set; }
    }
}