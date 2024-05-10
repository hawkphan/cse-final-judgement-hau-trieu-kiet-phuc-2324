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
    public class WebsiteCreatedProblemStatistic
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
                var problems = _context.Problems.AsQueryable();
                var groupedProblems = problems
                    .Where(p => (p.Date.Year == request.dateTime.Year && p.Date.Month == request.dateTime.Month))
                    .OrderBy(p => p.Date)
                    .GroupBy(p => p.Date.Date)
                    .ToList();
                var data = new DataStatisticDto();
                data.Times = new List<DateTime>();
                data.Values = new List<int>();

                var totalDaysOfMonth = DateTime.DaysInMonth(request.dateTime.Year, request.dateTime.Month);
                var totalCreatedProblem = 0;
                var dayIndex = 0;
                var groupIndex = 0;
                data.Values.Add(0);
                data.Times.Add(new DateTime(request.dateTime.Year,
                                                    request.dateTime.Month,
                                                    1,
                                                    0, 0, 0,
                                                    DateTimeKind.Utc));
                while (dayIndex < totalDaysOfMonth)
                {
                    if (groupedProblems.Count > 0 && groupedProblems[groupIndex].Key.Day == dayIndex + 1)
                    {
                        totalCreatedProblem += groupedProblems[groupIndex].Count();
                        groupIndex = groupIndex + 1 == groupedProblems.Count ? groupIndex : groupIndex + 1;
                    }

                    if ((dayIndex + 1) % 5 == 0)
                    {
                        data.Values.Add(totalCreatedProblem);
                        data.Times.Add(new DateTime(request.dateTime.Year,
                                                            request.dateTime.Month,
                                                            (dayIndex + 1),
                                                            0, 0, 0,
                                                            DateTimeKind.Utc));
                        totalCreatedProblem = 0;
                    }
                    dayIndex++;
                }
                if (totalDaysOfMonth < 30)
                {
                    data.Values.Add(totalCreatedProblem);
                    data.Times.Add(new DateTime(request.dateTime.Year,
                                                        request.dateTime.Month,
                                                        dayIndex - 1,
                                                        0, 0, 0,
                                                        DateTimeKind.Utc));
                }
                else if (totalDaysOfMonth > 30)
                {
                    if (groupedProblems[groupedProblems.Count - 1].Key.Day == 31)
                    {
                        data.Values.Add(groupedProblems[groupIndex].Count());
                    }
                    else
                    {
                        data.Values.Add(0);
                    }
                    data.Times.Add(new DateTime(groupedProblems[0].Key.Year,
                                                        groupedProblems[0].Key.Month,
                                                        31,
                                                        0, 0, 0,
                                                        DateTimeKind.Utc));
                }

                return ApiResult<DataStatisticDto>.Success(data);
            }
        }
    }
}