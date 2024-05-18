using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Domain
{
    public class SolutionRequestDto
    {
        public Guid UserId { get; set; }
        public Guid ProblemId { get; set; }
        public Guid? ContestId { get; set; }
        public int LanguageId { get; set; }
        public String Solution { get; set; }
    }
}