using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class LanguagesUsageDto
    {
        public int languageId { get; set; }
        public int totalSubmissions { get; set; }
    }
}