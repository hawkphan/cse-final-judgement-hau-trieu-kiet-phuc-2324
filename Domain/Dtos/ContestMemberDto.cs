using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class ContestMemberDto
    {
        public Guid Id { get; set; }
        public double Role { get; set; } // 0 for Contest Admin, 1 for Contestant
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public Guid ContestId { get; set; }
        public Contest Contest { get; set; }
    }
}