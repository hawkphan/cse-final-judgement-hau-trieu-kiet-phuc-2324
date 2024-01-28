using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Language
    {
        [Key]
        public Guid Id;
        public ICollection<ProblemLanguage> ProblemLanguages { get; set; }
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public string Name;
        public List<String> RunCommands;
    }
}