using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ProblemDto
    {

        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public double Difficulty { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public double TimeLimit { get; set; }
        public ICollection<TestCase> TestCases { get; set; }
        public ICollection<Result> Results { get; set; }
        public ICollection<Solution> Solutions { get; set; }
        public ICollection<ProblemLanguage> ProblemLanguages { get; set; }

    }
}