using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dtos;


namespace Application.Chart
{
    public class DataStatisticDto
    {
        public ICollection<DateTime> Times { get; set; } 
        public ICollection<int> Values { get; set; } 
    }
}