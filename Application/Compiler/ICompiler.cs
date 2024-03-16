using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;

namespace Application
{
    public interface ICompiler
    {
        List<Result> Compile(string codeFilePath, ICollection<TestCase> testCases,Problem problem);
    }
}