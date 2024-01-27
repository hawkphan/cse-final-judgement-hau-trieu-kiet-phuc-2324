using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set;}
        public string Token { get; set; }
        public string Image { get; set; }
        public string UserName { get; set; }
    }
}