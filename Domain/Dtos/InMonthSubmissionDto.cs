using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class InMonthSubmissionDto{
        public int year { get; set;}
        public int month { get; set;}
        public int totalSubmission { get; set;}
    }

}