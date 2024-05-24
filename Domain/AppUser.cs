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
        public double Gender { get; set; }
        public string DisplayName { get; set; }
        public string AvatarUrl { get; set; }
        public double Rating { get; set; }
        public List<Problem> Problems { get; set; }
        public List<Solution> Solutions { get; set; }
        // [JsonIgnore]
        // public List<Language> Languages { get; set; }
        public List<ContestMember> MemberContests { get; set; }
        public List<Notification> SentNotifications { get; set; }
        public List<Notification> ReceivedNotifications { get; set; }
    }

}