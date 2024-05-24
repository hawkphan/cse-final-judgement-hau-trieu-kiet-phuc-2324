using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class ContestSubmissionStatisticDto
    {
        public Guid ContestId { get; set; }
        public int TotalCandidates { get; set; } = 0;
        public int TotalSubmissions { get; set; } = 0;
        public ICollection<ProblemSubmissionStatisticDto> ProblemSubmissionsStatistic { get; set;} = null;
        public ICollection<LanguagesUsageDto> LanguagesUsageStatistic { get; set;} = null;

    }

}