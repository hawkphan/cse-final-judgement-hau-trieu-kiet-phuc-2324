using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Solutions;
using Domain;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Microsoft.VisualBasic;

namespace Application.Chart
{
    public class ContestSubmissionStatisticChart
    {
        public class Query : IRequest<ContestSubmissionStatisticDto>
        {
            public Guid? Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, ContestSubmissionStatisticDto>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<ContestSubmissionStatisticDto> Handle(Query request, CancellationToken cancellationToken)
            {
                Guid? contestId = request?.Id;
                var contest = _context.Contests
                .Include(c => c.Problems)
                .Include(c => c.Solutions)
                .Include(c => c.Members)
                .FirstOrDefault(c => c.Id == contestId);

                var problemsList = contest.Problems.ToList();
                var solutionsList = contest.Solutions.ToList();


                var data = new ContestSubmissionStatisticDto();
                data.ContestId = contestId.Value;
                data.TotalSubmissions = solutionsList.Count();
                data.TotalCandidates = contest.Members.Count(m => m.Role == 1);

                var problemSubmissionsStatistic = new List<ProblemSubmissionStatisticDto>();
                foreach (var problem in problemsList)
                {
                    var solutions = solutionsList.Where(s => s.ProblemId == problem.ProblemId).ToList();
                    var problemSubmission = new ProblemSubmissionStatisticDto();
                    problemSubmission.ProblemId = problem.ProblemId;

                    if (solutions.Count() > 0)
                    {
                        problemSubmission.TotalSubmissions = solutions.Count();
                        problemSubmission.SubmissionStatus = calculateSubmissionStatus(solutions);                        
                    }

                    problemSubmissionsStatistic.Add(problemSubmission);
                }
                data.ProblemSubmissionsStatistic = problemSubmissionsStatistic;

                var languagesUsageStatistic = new List<LanguagesUsageDto>();
                var groupedSolutionsByLanguage = solutionsList.GroupBy(solution => solution.LanguageId);
                foreach (var group in groupedSolutionsByLanguage)
                {
                    var list = group.ToList();
                    var languageUsage = new LanguagesUsageDto();
                    languageUsage.LanguageId = group.Key;
                    languageUsage.TotalSubmissions = group.Count();
                    languageUsage.SubmissionStatus = calculateSubmissionStatus(list);
                    languagesUsageStatistic.Add(languageUsage);
                }
                data.LanguagesUsageStatistic = languagesUsageStatistic;
                return data;
            }

            private SubmissionStatusDto calculateSubmissionStatus(List<Solution> solutions)
            {
                var submissionStatus = new SubmissionStatusDto();
                submissionStatus.Accepted = solutions.Where(solution => solution.Status == 3).Count();
                submissionStatus.WrongAnswer = solutions.Where(solution => solution.Status == 4).Count();
                submissionStatus.TimeLimitExceeded = solutions.Where(solution => solution.Status == 5).Count();
                submissionStatus.CompileError = solutions.Where(solution => solution.Status == 6).Count();
                submissionStatus.RuntimeErrorSIGSEGV = solutions.Where(solution => solution.Status == 7).Count();
                submissionStatus.RuntimeErrorSIGXFSZ = solutions.Where(solution => solution.Status == 8).Count();
                submissionStatus.RuntimeErrorSIGFPE = solutions.Where(solution => solution.Status == 9).Count();
                submissionStatus.RuntimeErrorSIGABRT = solutions.Where(solution => solution.Status == 10).Count();
                submissionStatus.RuntimeErrorNZEC = solutions.Where(solution => solution.Status == 11).Count();
                submissionStatus.RuntimeErrorOther = solutions.Where(solution => solution.Status == 12).Count();
                submissionStatus.InternalError = solutions.Where(solution => solution.Status == 13).Count();
                submissionStatus.ExecFormatError = solutions.Where(solution => solution.Status == 14).Count();

                return submissionStatus;
            }
        }

    }
}