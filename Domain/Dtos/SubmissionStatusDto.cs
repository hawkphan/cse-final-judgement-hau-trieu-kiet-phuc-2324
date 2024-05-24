using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Dtos
{
    public class SubmissionStatusDto
    {
        public int Accepted { get; set; } = 0;
        public int WrongAnswer { get; set; } = 0;
        public int TimeLimitExceeded { get; set; } = 0;
        public int CompileError { get; set; } = 0;
        public int InternalError { get; set; } = 0;
        public int ExecFormatError { get; set; } = 0;
        public int RuntimeErrorSIGSEGV { get; set; } = 0;
        public int RuntimeErrorSIGXFSZ { get; set; } = 0;
        public int RuntimeErrorSIGFPE { get; set; } = 0;
        public int RuntimeErrorSIGABRT { get; set; } = 0;
        public int RuntimeErrorNZEC { get; set; } = 0;
        public int RuntimeErrorOther { get; set; } = 0;
    }

}
