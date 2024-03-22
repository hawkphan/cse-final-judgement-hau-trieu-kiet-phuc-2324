using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class UpdateDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        // [Required]
        public IFormFile Image { get; set; }
        public string UserName { get; set; }

        public DateTime Birthday { get; set; }
    }
}