using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
namespace Domain
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public bool IsFemale { get; set; }

        public string DisplayName { get; set; }
        public ICollection<Problem> Problems { get; set; }
        public ICollection<Solution> Solutions { get; set; }
        [JsonIgnore]
        public ICollection<Language> Languages { get; set; }
    }

}