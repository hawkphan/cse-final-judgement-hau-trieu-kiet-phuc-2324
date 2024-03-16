using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SolutionDto
    {
        public Guid userId { get; set; }
        public Guid problemId { get; set; }
        public Guid languageId { get; set; }
        public String solution { get; set; }
    }
}