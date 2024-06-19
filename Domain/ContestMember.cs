using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ContestMember
    {
        [Key]
        public Guid Id { get; set; }
        public double Role { get; set; } // 0 for Contest Admin, 1 for Contestant, 2 for Virtual Contestant
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public Guid ContestId { get; set; }
        public Contest Contest { get; set; }
        public DateTime? VirtualStartTime { get; set; }
        public DateTime? VirtualEndTime { get; set; }
    }
}