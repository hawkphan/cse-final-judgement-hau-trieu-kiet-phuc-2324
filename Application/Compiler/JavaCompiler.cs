using System.Diagnostics;
using Domain;

namespace Application
{
    public class JavaCompiler : ICompiler
    {
        public List<Result> Compile(string codeFilePath, ICollection<TestCase> testCases, Problem problem)
        {
            List<Result> results = new List<Result>();

            // Compile the Java code using javac command
            Process process = new Process();
            process.StartInfo.FileName = "javac";
            process.StartInfo.Arguments = codeFilePath;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;

            process.Start();
            process.WaitForExit();

            Result compileResult = new Result();
            // compileResult.Passed = (process.ExitCode == 0);
            compileResult.Output = process.StandardOutput.ReadToEnd();
            results.Add(compileResult);

            // if (compileResult.Passed)
            // {
            //     // Execute the compiled Java code
            //     process.StartInfo.FileName = "java";
            //     process.StartInfo.Arguments = GetClassName(codeFilePath);
            //     process.Start();

            //     // Read the output of the Java program
            //     Result runResult = new Result();
            //     runResult.Output = process.StandardOutput.ReadToEnd();
            //     results.Add(runResult);
            // }

            return results;
        }

        private string GetClassName(string codeFilePath)
        {
            // Extract class name from the file path assuming that the file name is the same as the class name
            string[] parts = codeFilePath.Split('/');
            string fileName = parts[parts.Length - 1];
            return fileName.Substring(0, fileName.LastIndexOf('.'));
        }
    }
}