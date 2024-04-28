using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ProblemLanguage
    {
        [Key]
        public Guid Id { get; }
        public int LanguageId { get; set; }
        public Language Language { get; set; }
        public Guid ProblemId { get; set; }
        public Problem Problem { get; set; }
    }
}