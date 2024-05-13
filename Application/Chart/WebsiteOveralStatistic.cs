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
    public class WebsiteOveralStatistic
    {
        public class Query : IRequest<ApiResult<WebsiteOveralStatisticDto>>
        {
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<WebsiteOveralStatisticDto>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<ApiResult<WebsiteOveralStatisticDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var problems = _context.Problems.Include(p => p.Solutions);
                var solutions = _context.Solutions.AsQueryable();
                var contests = _context.Contests.AsQueryable();

                var data = new WebsiteOveralStatisticDto();
                var solutionsStatistic = new SolutionSubmitedStatistic();

                data.TotalProblems = problems.Count();
                data.ThisMonthCreatedProblems = problems.Where(p => p.Date.Month == DateTime.Now.Month).Count();
                data.TotalContests = contests.Count();
                data.ThisMonthStartContests = contests.Where(p => p.StartTime.Month == DateTime.Now.Month).Count();


                var processingSubmmissions = solutions.Where(s => s.Status == 2).Count();
                var inQueueSubmissions = solutions.Where(s => s.Status == 1).Count();
                var todaySubmission = solutions.Where(s => s.CreatedDate.Date == DateTime.Today);
                var thisMonthSubmission = solutions.Where(s => s.CreatedDate.Month == DateTime.Now.Month);
                var thisYearSubmission = solutions.Where(s => s.CreatedDate.Year == DateTime.Now.Year);
                solutionsStatistic.TodayAccepted = todaySubmission.Count(s => s.Status == 3);
                solutionsStatistic.ThisMonthAccepted = thisMonthSubmission.Count(s => s.Status == 3);
                solutionsStatistic.ThisYearAccepted = thisYearSubmission.Count(s => s.Status == 3);

                solutionsStatistic.TodayRejected = todaySubmission.Count() - solutionsStatistic.TodayAccepted - processingSubmmissions - inQueueSubmissions;
                solutionsStatistic.ThisMonthRejected = thisMonthSubmission.Count() - solutionsStatistic.ThisMonthAccepted - processingSubmmissions - inQueueSubmissions;
                solutionsStatistic.ThisYearRejected = thisYearSubmission.Count() - solutionsStatistic.ThisYearAccepted - processingSubmmissions - inQueueSubmissions;
                


                data.SolutionStatistic = solutionsStatistic;
                data.ProcessingSubmissions = processingSubmmissions;
                data.InQueueSubmissions = inQueueSubmissions;
                


                return ApiResult<WebsiteOveralStatisticDto>.Success(data);
            }
        }
    }
}