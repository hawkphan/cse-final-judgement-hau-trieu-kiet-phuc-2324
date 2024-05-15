using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class WebsiteOverallStatisticDto
    {
        public SolutionSubmitedStatistic SolutionStatistic { get; set; }
        public int ProcessingSubmissions { get; set; } = 0;
        public int InQueueSubmissions { get; set; } = 0;
        public int TotalProblems { get; set; } = 0;
        public int ThisMonthCreatedProblems { get; set; } = 0;
        public int TotalContests { get; set; } = 0;
        public int ThisMonthStartContests { get; set; } = 0;
    }

    public class SolutionSubmitedStatistic
    {
        public int TodayAccepted { get; set; }
        public int TodayRejected { get; set;}
        public int ThisMonthAccepted { get; set; }
        public int ThisMonthRejected { get; set; }
        public int ThisYearAccepted { get; set; }
        public int ThisYearRejected { get; set; }
    }

}