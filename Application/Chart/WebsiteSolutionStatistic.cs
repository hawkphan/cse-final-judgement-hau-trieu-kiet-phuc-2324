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
            public DateTime startTime { get; set; }
            public DateTime endTime { get; set; }
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
                var start = request.startTime;
                var end = request.endTime;

                if (end.Date == DateTime.Now.Date)
                {
                    var time = DateTime.Now;
                    end = new DateTime(time.Year, time.Month, time.Day, time.Hour, time.Minute, time.Second, DateTimeKind.Utc);
                }
                else
                {
                    end = new DateTime(end.Year, end.Month, end.Day, 23, 59, 59, 999, DateTimeKind.Utc);
                }

                start = new DateTime(start.Year, start.Month, start.Day, 0, 0, 0, DateTimeKind.Utc);

                var interval = calculateInterval(start, end);

                var solutions = _context.Solutions.AsQueryable();

                var selectedSolutions = solutions
                                        .Where(sol => sol.CreatedDate.Ticks >= start.Ticks && sol.CreatedDate.Ticks <= end.Ticks)
                                        .GroupBy(sol => new
                                        {
                                            Time = (sol.CreatedDate.Ticks / interval) * interval
                                        })
                                                                .Select(group => new
                                                                {
                                                                    Time = new DateTime( group.Key.Time, DateTimeKind.Utc),
                                                                    Total = group.Count()
                                                                })
                                        .ToList();


                var data = new DataStatisticDto();
                data.Times = new List<DateTime>();
                data.Values = new List<int>();


                if (selectedSolutions.Count() > 0){
                    if(selectedSolutions[0].Time > start){
                        data.Times.Add(start);
                        data.Values.Add(0);
                    }
                    foreach(var group in selectedSolutions){
                        data.Times.Add(group.Time);
                        data.Values.Add(group.Total);                        
                    }
                    if(selectedSolutions[selectedSolutions.Count() - 1].Time < end){
                        data.Times.Add(end);
                        data.Values.Add(0);
                    }
                }else{
                    data.Times.Add(start);
                    data.Times.Add(end);
                    data.Values.Add(0);
                    data.Values.Add(0);
                }

                // data.Times.Add(start);
                // data.Times.Add(end);
                // data.Values.Add(selectedSolutions.Count());
                // data.Values.Add((int)(interval));
                return ApiResult<DataStatisticDto>.Success(data);
            }

            private static long calculateInterval(DateTime start, DateTime end)
            {
                long interval = 3600L * 10000000L;

                TimeSpan timeDifference = end - start;
                int numberOfDays = (int)timeDifference.TotalDays;

                if (numberOfDays == 0)
                {
                    return interval;
                }
                else
                if (numberOfDays <= 3)
                {
                    return interval * (2 * numberOfDays);
                }
                else if (numberOfDays <= 36)
                {
                    var power = numberOfDays / 12 == 0 ? 1 : numberOfDays / 12;
                    return interval * (24 * power);
                }
                else if (numberOfDays <= 365)
                {
                    var power = numberOfDays / 60 == 0 ? 1 : numberOfDays / 60;
                    return interval * (120 * power);
                }

                return interval * (24 * 365 * numberOfDays / 365);
            }
        }
    }
}