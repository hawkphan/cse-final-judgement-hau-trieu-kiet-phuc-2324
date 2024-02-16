using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Problems
{
    public class ProblemValidator : AbstractValidator<Problem>
    {
        public ProblemValidator()
        {
            // RuleFor(x => x.Title).NotEmpty();
            // RuleFor(x => x.Code).NotEmpty();
            // RuleFor(x => x.Description).NotEmpty();
            // RuleFor(x => x.Difficulty).NotEmpty();
        }
    }
}