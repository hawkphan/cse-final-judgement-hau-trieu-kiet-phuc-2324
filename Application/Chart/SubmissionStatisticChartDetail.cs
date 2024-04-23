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
    public class SubmissionStatisticChartDetai
    {
        public class Query : IRequest< ApiResult<SubmissionStatisticDto>>
        {
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query,  ApiResult<SubmissionStatisticDto>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task< ApiResult<SubmissionStatisticDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guid? userId = request.UserId;
                var solutions = _context.Solutions.AsQueryable();

                if (userId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                }

                var data = new SubmissionStatisticDto();
                data.totalSubmissions = solutions.Count();
                data.totalSolvedSubmissions = 0;
                
                var difficultyStatistic = solutions.GroupBy(s =>  s.Problem.Difficulty )
                .Select(group => new DifficultyStatistic
                {
                    difficulty = group.Key,                   
                    totalSubmissions = group.Count(),
                    totalSolved = group.Count(s => s.Status == 3)
                })
                .ToList();

                data.collectionDifficultyStatistic = difficultyStatistic;
                foreach (var item in data.collectionDifficultyStatistic)
                {
                    data.totalSolvedSubmissions += item.totalSolved;
                }
                return ApiResult<SubmissionStatisticDto>.Success(data);
            }
        }
    }
}
