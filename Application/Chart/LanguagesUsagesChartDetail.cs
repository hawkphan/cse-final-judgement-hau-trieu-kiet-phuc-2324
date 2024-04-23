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
    public class LanguagesUsagesChartDetail
    {
        public class Query : IRequest<ApiResult<ICollection<LanguagesUsageDto>>>
        {
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApiResult<ICollection<LanguagesUsageDto>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<ApiResult<ICollection<LanguagesUsageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guid? userId = request.UserId;
                var solutions = _context.Solutions.AsQueryable();

                if (userId != null)
                {
                    solutions = (IOrderedQueryable<Solution>)solutions.Where(s => s.UserId == userId);
                }

                var data = solutions.GroupBy(s => new { s.LanguageId })
                .Select(group => new LanguagesUsageDto
                {
                    languageId = group.Key.LanguageId,
                    totalSubmissions = group.Count()
                })
                .ToList();


                return ApiResult<ICollection<LanguagesUsageDto>>.Success(data);
            }
        }
    }
}
