using Application.Core;
using Application.Interfaces;
using Application.Solutions;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Problems
{
    public class Create
    {
        public class Command : IRequest<ApiResult<ProblemDto>>
        {
            public Problem Problem { get; set; }
            public IFormFile TestCaseZip { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Problem).SetValidator(new ProblemValidator());
            }
        }
        public class Handler : IRequestHandler<Command, ApiResult<ProblemDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<ApiResult<ProblemDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (request.TestCaseZip.Length == 0 || request.TestCaseZip == null)
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Create" });
                }

                request.Problem.User = user;
                request.Problem.Date = DateTime.UtcNow;



                FileManager fileManager = new FileManager();
                await fileManager.SaveAndExtractZipFile(request.TestCaseZip, request.Problem.Code);
                var testCaseLocation = Path.Combine("TestCases", request.Problem.Code);
                String[] files = fileManager.getFileNameInFolder(testCaseLocation, "*.in");
                foreach (var inputPath in files)
                {
                    var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(inputPath);
                    TestCase testCase = new TestCase();
                    testCase.Input = Path.Combine(testCaseLocation, $"{fileNameWithoutExtension}.in");
                    testCase.Output = Path.Combine(testCaseLocation, $"{fileNameWithoutExtension}.out");
                    request.Problem.TestCases.Add(testCase);
                }


                _context.Problems.Add(request.Problem);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result)
                {
                    return ApiResult<ProblemDto>.Failure(new string[] { "Failed to Create" });
                }
                // Instead of creating problemsQuery, you can directly use request.Problem here
                var newProblemDto = _mapper.Map<ProblemDto>(request.Problem);

                return ApiResult<ProblemDto>.Success(newProblemDto);
            }

        }
    }
}