using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class LanguagesUsageDto
    {
        public int LanguageId { get; set; }
        public int TotalSubmissions { get; set; }
        public SubmissionStatusDto SubmissionStatus { get; set; } = null;
    }
}