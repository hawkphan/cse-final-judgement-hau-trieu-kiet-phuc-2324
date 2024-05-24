using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class ProblemSubmissionStatisticDto
    {
        public Guid ProblemId { get; set; }
        public int TotalSubmissions { get; set; } = 0;
        public SubmissionStatusDto SubmissionStatus { get; set; } = null;
        public ICollection<LanguagesUsageDto> LanguagesUsage { get; set; }
    }

}
