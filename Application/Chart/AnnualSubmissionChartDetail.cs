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

                solutions = solutions
                .Where(s => s.CreatedDate.Year == DateTime.Now.Year && s.CreatedDate.Month >= DateTime.Now.Month - 11);

                var groupedSolutions = solutions.GroupBy(s => new { s.CreatedDate.Year, s.CreatedDate.Month })
                .Select(group => new InMonthSubmitDto
                {
                    Year = group.Key.Year,
                    Month = group.Key.Month,
                    TotalSubmissions = group.Count()
                })
                .OrderBy(group => group.Year)
                .ThenBy(group => group.Month)
                .ToList();

                var data = new List<InMonthSubmitDto>();
                groupedSolutions.Reverse();
                var month = groupedSolutions.Count > 0 ? groupedSolutions[0].Month : 0;
                var year = DateTime.Now.Year;
                var groupedSolutionsIndex = month != 0 ? 0 : -1;

                for (int i = 0; i < 12; i++)
                {
                    if (month != 0 && groupedSolutionsIndex != -1 && groupedSolutions[groupedSolutionsIndex].Month == month)
                    {
                        data.Add(createMonthSubmitDto(year, month, groupedSolutions[groupedSolutionsIndex].TotalSubmissions));
                        if (month - 1 == 0)
                        {
                            month = 12;
                            year--;
                        }else{
                            month--;
                        }

                        groupedSolutionsIndex = (groupedSolutionsIndex + 1) < groupedSolutions.Count() ? groupedSolutionsIndex + 1 : -1;
                    }
                    else
                    {
                        data.Add(createMonthSubmitDto(year, month));
                        if (month - 1 == 0)
                        {
                            month = 12;
                            year--;
                        }else{
                            month--;
                        }

                    }

                }
                data.Reverse();
                return ApiResult<ICollection<InMonthSubmitDto>>.Success(data);
            }
        }

        private static InMonthSubmitDto createMonthSubmitDto(int year, int month)
        {
            return new InMonthSubmitDto
            {
                Year = year,
                Month = month,
                TotalSubmissions = 0,
            };
        }

        private static InMonthSubmitDto createMonthSubmitDto(int year, int month, int totalSubmissions)
        {
            return new InMonthSubmitDto
            {
                Year = year,
                Month = month,
                TotalSubmissions = totalSubmissions,
            };

        }
    }
}
