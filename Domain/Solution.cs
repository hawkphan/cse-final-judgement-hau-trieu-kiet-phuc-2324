using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Solution
    {
        [Key]
        public long SolutionId;
        public Problem Problem;
        public string FileName;
        public string Language;
        public string Output;
        public double Score;
    }
}