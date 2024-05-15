using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ProfileDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public double Gender { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public ICollection<int> LanguageUsage { get; set; }
        public UserActivityRecord Activities { get; set; }
        public double Rating { get; set; } = 0;
    }

    public class UserActivityRecord
    {
        public int Views { get; set; }
        public int LastWeekViews { get; set; }
        public int Solutions { get; set; }
        public int LastWeekSolutions { get; set; }
        public int SolvedProblems { get; set; }
        public int LastWeekSolvedProblems { get; set; }
    }
}