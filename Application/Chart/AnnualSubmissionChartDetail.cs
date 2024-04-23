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
using Persistence;
using Microsoft.VisualBasic;

namespace Application.Chart
{
    public class AnnualSubmissionChartDetail
    {
        public class Query : IRequest<ApiResult<ICollection<InMonthSubmissionDto>>>
        {
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<ICollection<InMonthSubmissionDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<ApiResult<ICollection<InMonthSubmissionDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guid? userId = request.UserId;
                var solutions = _context.Solutions.AsQueryable();

                if (userId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                }
                // Filter the last 12 months
                solutions = solutions
                .Where(s => s.CreatedDate.Year == DateTime.Now.Year && s.CreatedDate.Month >= DateTime.Now.Month - 11);
                

                var data = solutions.GroupBy(s => new { s.CreatedDate.Year, s.CreatedDate.Month })
                .Select(group => new InMonthSubmissionDto
                {
                    year = group.Key.Year,
                    month = group.Key.Month,
                    totalSubmission = group.Count()
                })
                .OrderBy(group => group.year)
                .ThenBy(group => group.month)
                .ToList();


                return ApiResult<ICollection<InMonthSubmissionDto>>.Success(data);
            }
        }
    }
}
