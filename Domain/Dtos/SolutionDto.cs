using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Domain
{
    public class SolutionDto
    {
        public Guid userId { get; set; }
        public Guid problemId { get; set; }
        public int languageId { get; set; }
        public String solution { get; set; }
    }
}