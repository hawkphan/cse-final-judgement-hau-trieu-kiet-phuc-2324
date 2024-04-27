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
        public class Query : IRequest<ApiResult<ICollection<InMonthSubmitDto>>>
        {
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<ICollection<InMonthSubmitDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<ApiResult<ICollection<InMonthSubmitDto>>> Handle(Query request, CancellationToken cancellationToken)
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
                .Select(group => new InMonthSubmitDto
                {
                    Year = group.Key.Year,
                    Month = group.Key.Month,
                    TotalSubmissions = group.Count()
                })
                .OrderBy(group => group.Year)
                .ThenBy(group => group.Month)
                .ToList();


                return ApiResult<ICollection<InMonthSubmitDto>>.Success(data);
            }
        }
    }
}
