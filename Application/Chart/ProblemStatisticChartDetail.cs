using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Application.Core;
using Application.Interfaces;
using Application.Solutions;

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
    public class ProblemStatisticChartDetail
    {
        public class Query : IRequest<ApiResult<ProblemStatisticDto>>
        {
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<ProblemStatisticDto>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<ApiResult<ProblemStatisticDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guid? userId = request.UserId;
                var problems = _context.Problems.Include(p => p.Solutions);
                var userSolvedProblems = problems.Where(p => p.Solutions.Any(s => s.UserId == userId)).ToList();

                var data = new ProblemStatisticDto();
                data.TotalProblems = problems.Count();
                data.TotalSolvedProblems = userSolvedProblems.Count(p => p.Solutions.Any(s => (s.Status == 3)));


                var difficultyStatistics = new List<DifficultyStatistic>();

                var groupedProblems = userSolvedProblems.GroupBy(p =>
                    (p.Difficulty <= 1000) ? 0 :
                    (p.Difficulty <= 2000) ? 1 : 2
                ).Select(g => new DifficultyStatistic
                {
                    Difficulty = g.Key,
                    TotalProblems = g.Count(),
                    TotalSolved = g.Count(p => p.Solutions.Any(s => s.Status == 3))
                }).ToList();

                var index = 0;
                for (int i = 0; i < 3; i++)
                {

                    if (groupedProblems.Count > index && groupedProblems[index].Difficulty.Equals(i))
                    {
                        difficultyStatistics.Add(groupedProblems[index]);
                        index = (index + 1 < groupedProblems.Count) ? index + 1 : 0;
                    }
                    else
                    {
                        var difficultyStatistic = new DifficultyStatistic
                        {
                            Difficulty = i,
                            TotalProblems = 0,
                            TotalSolved = 0
                        };
                        difficultyStatistics.Add(difficultyStatistic);
                    }
                }


                data.DifficultyStatistics = difficultyStatistics;

                return ApiResult<ProblemStatisticDto>.Success(data);
            }
        }
    }
}
