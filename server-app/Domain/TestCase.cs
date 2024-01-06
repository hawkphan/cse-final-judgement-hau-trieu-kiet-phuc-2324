using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class TestCase
    {
        public Guid Id { get; set; }
        public String Input { get; set; }
        public String ExpectedResult { get; set; }
    }
}