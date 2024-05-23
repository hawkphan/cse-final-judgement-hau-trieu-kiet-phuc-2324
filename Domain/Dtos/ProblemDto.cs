using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dtos;

namespace Domain
{
    public class ProblemDto
    {

        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public ProfileDto User { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public double Difficulty { get; set; }
        public double PrivacyStatus { get; set; }
        public string Description { get; set; }
        public int GradeMode { get; set; }
        public double ApproximateRate { get; set; }
        public DateTime Date { get; set; }
        public int TimeLimit { get; set; }
        public int MemoryLimit { get; set; }
        public ICollection<ProblemLanguageDto> ProblemLanguages { get; set; }
    }
}