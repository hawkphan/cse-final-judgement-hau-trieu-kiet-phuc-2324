using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Result
    {
        [Key]
        public Guid Id;
        public Guid SolutionId { get; set; }
        public Solution Solution { get; set; }
        public Guid TestCaseId { get; set; }
        public TestCase TestCase { get; set; }
        public String Output { get; set; }
        public Double ExecutionTime { get; set; }
        public bool Passed { get; set; }
    }
}