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
            // Read input data from file
            string inputFilePath = Path.Combine(fileManager.CurrentDirectory, testCase.Input);
            string input = File.ReadAllText(inputFilePath);

            // Define process start info
            ProcessStartInfo start = new ProcessStartInfo
            {
                FileName = "py", // Assuming "py" is the Python executable name
                Arguments = $"{pythonScriptPath} {input}",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = true // Avoid creating a window for the process
            };

            using (Process process = new Process())
            {
                process.StartInfo = start;

                try
                {
                    // Start the process
                    process.Start();

                    // Write input data to the standard input stream of the process
                    process.StandardInput.Write(input + "\r\n");

                    // Define timeout for the process execution (in milliseconds)
                    int timeout = problem.TimeLimit; // Use the problem's time limit as the timeout
                    long memoryUsage = process.PrivateMemorySize64; // Memory usage in bytes
                    // Run the process asynchronously with a timeout
                    if (!process.WaitForExit(timeout))
                    {
                        // Timeout occurred
                        result.Status = 2; // TLE
                        process.Kill(); // Terminate the process
                        return result;
                    }

                    // Check memory usage

                    if (memoryUsage > 524288000)
                    {
                        // Memory limit exceeded
                        result.Status = 3; // MLE
                        process.Kill(); // Terminate the process
                        return result;
                    }

                    // Read standard output and error streams
                    string output = process.StandardOutput.ReadToEnd();
                    string error = process.StandardError.ReadToEnd();

                    // Check for memory usage (if needed) and other validations

                    // Process test output
                    bool passed = ProcessTestOutput(output, testCase.Output);
                    if (passed)
                    {
                        result.Output = output;
                        result.Status = 0; // Accepted
                        result.TestCase = testCase;
                    }
                    else
                    {
                        // Wrong answer
                        result.Output = error.Length > 0 ? error : "Wrong answer";
                        result.Status = 1;
                    }
                }
                catch (Exception ex)
                {
                    // Exception occurred
                    result.Status = 8; // Submission Error
                    result.Output = ex.Message;
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