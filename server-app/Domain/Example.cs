using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Example
    {
        public Guid Id { get; set; }
        public Guid ProblemId { get; set; }
        public string Input { get; set; }
        public string Output { get; set; }
        public string Explaination { get; set; }
    }
}