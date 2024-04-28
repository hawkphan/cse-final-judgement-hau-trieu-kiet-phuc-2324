using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Request
    {
        [Key]
        public Guid Id { get; set; }
        public Guid ContestId { get; set; }
        public Contest Contest { get; set; }
        public Guid ApproverId { get; set; }
        public AppUser Approver { get; set; }
        public double Status { get; set; } // 0 for Rejected, 1 for Approved
    }
}