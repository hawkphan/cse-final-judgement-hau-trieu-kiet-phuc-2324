using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class WebsiteOveralStatisticDto
    {
        public SolutionSubmitedStatistic SolutionStatistic { get; set; }
        public UserLogInStatistic UserLogInStatistic { get; set; }
        public int ProcessingSubmissions { get; set; } = 0;
        public int InQueueSubmissions { get; set; } = 0;
        public int TotalProblems { get; set; } = 0;
        public int ThisMonthCreatedProblems { get; set; } = 0;
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

    public class UserLogInStatistic 
    {
        public int TotalUser { get; set; } =0;
        public int LoggingIn { get; set; } = 0;
        public int LoggingOut { get; set; } = 0;
    }
}