using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Application.Solutions;
using Domain;

namespace Application.Compiler
{
    public class PythonCompiler : ICompiler
    {
        public List<Result> Compile(string codeFilePath, ICollection<TestCase> testCases, Problem problem)
        {
            List<Result> results = new List<Result>();
            foreach (var testCase in testCases)
            {
                Result result = ExecuteTestCase(codeFilePath, testCase, problem);
                results.Add(result);
            }

            return results;
        }
        private Result ExecuteTestCase(string pythonScriptPath, TestCase testCase, Problem problem)
        {
            FileManager fileManager = new FileManager();
            Result result = new Result();
            result.TestCaseId = testCase.Id;
            string Input = File.ReadAllText(Path.Combine(fileManager.CurrentDirectory, testCase.Input));
            // Execute the Python script with input file
            ProcessStartInfo start = new ProcessStartInfo
            {
                FileName = "py",
                Arguments = $"{pythonScriptPath} {Input} ",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = false
            };

            using (Process process = Process.Start(start))
            {
                process.StandardInput.Write(Input + "\r\n");
                double inputWritingTime = process.TotalProcessorTime.TotalMilliseconds;
                long memoryUsage = 0;
                while (!process.HasExited)
                {
                    // Get the private memory usage of the process
                    memoryUsage = process.PrivateMemorySize64;

                    if (memoryUsage > 524288000) // 500 MB is 524288000 bytes
                    {
                        result.Status = 3; // Catch Out of memory
                        process.Kill();
                        return result;
                    }
                }

                string output = process.StandardOutput.ReadToEnd();
                string error = process.StandardError.ReadToEnd();


                if (!process.WaitForExit(problem.TimeLimit))
                {
                    process.Kill();
                    result.Status = 2; // Catch Time Limit
                    return result;
                }

                double executionTime = process.TotalProcessorTime.TotalMilliseconds - inputWritingTime;
                result.MemoryUsage = memoryUsage;
                result.ExecutionTime = executionTime;

                bool passed = ProcessTestOutput(output, testCase.Output);
                if (passed)
                {
                    result.Output = output;
                    result.Status = 0;
                    result.TestCase = testCase;
                    //Things goes well
                }
                else
                {
                    switch (error.Length > 0)
                    {
                        case (true):
                            result.Output = error;
                            result.Status = 8;
                            //error happened
                            break;
                        case (false):
                            result.Status = 1;
                            break;
                            //Wrong answer

                    }
                }

            }

            return result;
        }
        private bool ProcessTestOutput(string actualOutput, string expectedOutputPath)
        {
            expectedOutputPath = Path.Combine(Directory.GetCurrentDirectory(), $"{expectedOutputPath}");
            string expectedOutput = File.ReadAllText(expectedOutputPath);
            return actualOutput.Trim().Replace("\r", "").Replace("\n", "") == expectedOutput.Trim();
        }
    }
}