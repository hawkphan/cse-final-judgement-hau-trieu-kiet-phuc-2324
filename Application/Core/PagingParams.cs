using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Application.Core
{
    public class PagingParams
    {
        private const int MaxPageSize = 50;
        [FromQuery(Name = "pageNo")]
        public int PageNumber { get; set; } = 1;
        public string Keywords { get; set; } = "";
        private int _pageSize = 10;
        public string Order { get; set; }
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}