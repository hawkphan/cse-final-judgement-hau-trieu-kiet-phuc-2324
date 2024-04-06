using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class TestCase
    {
        public Guid Id { get; set; }
        public Guid ProblemId { get; set; }
        public Problem Problem { get; set; }
        public String Input { get; set; }
        public String Output { get; set; }
        public String Name { get; set; }
        public List<Result> Results { get; set; }
    }
}