using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class RankUserDto
    {
        public int Rank { get; set; }
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public double Elo { get; set; }
    }
}