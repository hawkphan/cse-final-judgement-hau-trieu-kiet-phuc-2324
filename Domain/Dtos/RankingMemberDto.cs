using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class RankingMemberDto
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public int Rank { get; set; }
        public double Score { get; set; }
        public int SolvedProblemCount { get; set; } = 0;
        public double TotalTime { get; set; } = 0;
        public List<RankingProblemDto> Problems { get; set; } = new List<RankingProblemDto>();

    }
}