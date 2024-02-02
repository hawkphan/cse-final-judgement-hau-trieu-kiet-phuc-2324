using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class Language
    {
        [Key]
        public Guid Id;
        [JsonIgnore]
        public ICollection<ProblemLanguage> ProblemLanguages { get; set; }
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public string Name { get; set; } = "null";
        [NotMapped]
        public List<String> RunCommands { get; set; } = new List<string>();
    }
}