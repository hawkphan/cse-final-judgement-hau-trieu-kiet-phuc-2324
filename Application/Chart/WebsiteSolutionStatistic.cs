using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Application.Core;
using Application.Interfaces;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Domain;
using Domain.Dtos;

using MediatR;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

using Persistence;


namespace Application.Chart
{
    public class WebsiteSolutionStatistic
    {
        public class Query : IRequest<ApiResult<DataStatisticDto>>
        {
            public DateTime dateTime { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<DataStatisticDto>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<ApiResult<DataStatisticDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var solutions = _context.Solutions.AsQueryable();
                var groupedSolutions = solutions
                    .Where(s => s.CreatedDate.Date == request.dateTime.Date)
                    .GroupBy(s => s.CreatedDate.Hour)
                    .ToList();

                var data = new DataStatisticDto();
                data.Times = new List<DateTime>();
                data.Values = new List<int>();

                var hourIndex = 0;
                var totalSolution = 0;
                var groupIndex = 0;
                var date = request.dateTime.Date;
                data.Values.Add(0);
                data.Times.Add(new DateTime(date.Year,
                                            date.Month,
                                            date.Day,
                                            0, 0, 0,
                                            DateTimeKind.Utc));
                while (hourIndex != 23)
                {
                    if (groupedSolutions.Count() > 0 && groupedSolutions[groupIndex].Key == hourIndex + 1)
                    {
                        totalSolution += groupedSolutions[groupIndex].Count();
                        groupIndex = groupIndex + 1 == groupedSolutions.Count ? groupIndex : groupIndex + 1;
                    }

                    if ((hourIndex + 1) % 2 == 0)
                    {

                        data.Values.Add(totalSolution);
                        data.Times.Add(new DateTime(date.Year,
                                                    date.Month,
                                                    date.Day,
                                                    (hourIndex + 1), 0, 0,
                                                    DateTimeKind.Utc));
                        totalSolution = 0;
                    }

                    hourIndex++;
                }

                data.Values.Add(totalSolution);
                data.Times.Add(new DateTime(date.Year,
                                            date.Month,
                                            date.Day,
                                            23, 59, 59,
                                            DateTimeKind.Utc));
                return ApiResult<DataStatisticDto>.Success(data);
            }
        }
    }
}