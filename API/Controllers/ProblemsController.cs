using Application.Core;
using Application.Problems;
using System.IO.Compression;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Text;
using System.IO;
using Microsoft.VisualBasic.FileIO;
using SharpCompress.Common;
using Microsoft.IdentityModel.Tokens;
namespace API.Controllers
{
    public class ProblemsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet] //api/problems
        public async Task<IActionResult> GetProblems([FromQuery] PagingParams param, [FromQuery] bool isOnly, [FromQuery] Guid userId)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param, IsOnly = isOnly, UserId = userId }));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProblemDto>> GetProblem(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> CreateProblem([FromForm] Problem newProblem, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return HandleApiResult(ApiResult<Problem>.Failure(new string[] { "File is Empty" }));
            }
            try
            {
                if (IsZipMimeType(file.ContentType))
                {
                    newProblem = await MapTestCasesAsync(newProblem, file);
                }
                if (!newProblem.TestCases.IsNullOrEmpty())
                { 
                    return HandleApiResult(await Mediator.Send(new Create.Command { Problem = newProblem }));
                }
                else
                {
                    return HandleApiResult(ApiResult<Problem>.Failure(new string[] { "Something Wrong" }));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit([FromRoute] Guid id, [FromForm] Problem Problem, [FromForm] IFormFile file)
        {
            Problem.Id = id;
            if (file != null && file.Length != 0)
            {
                Problem = await MapTestCasesAsync(Problem, file);
            }
            return HandleApiResult(await Mediator.Send(new Edit.Command { Problem = Problem }));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
        private static bool IsZipMimeType(string mimeType)
        {
            List<string> zipMimeTypes = new List<string>
        {
            "application/octet-stream",
            "multipart/x-zip",
            "application/zip",
            "application/zip-compressed",
            "application/x-zip-compressed",
        };

            return zipMimeTypes.Contains(mimeType);
        }


        public static async Task<Problem> MapTestCasesAsync(Problem Problem, IFormFile file)
        {
            try
            {
                // Define the directory where the file will be saved
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var fileName = $"{Problem.Code}.zip";

                // Combine the directory path with the file name
                var filePath = Path.Combine(uploadsFolder, fileName);
                var unzipPath = Path.Combine(uploadsFolder, Problem.Code);
                if (Directory.Exists(unzipPath))
                {
                    string[] filePaths = Directory.GetFiles(unzipPath);
                    for (int i = 0; i < filePaths.Length; i++)
                    {
                        System.IO.File.Delete(filePaths[i]);
                    }
                }
                await SaveFile(filePath, file);
                Directory.CreateDirectory(unzipPath);
                ZipFile.ExtractToDirectory(filePath, unzipPath);

                // Create TestCase Object From 
                var files = Directory.GetFiles(unzipPath, "*.in");
                foreach (var inputPath in files)
                {
                    var relativePath = Path.Combine("Uploads", Problem.Code);
                    var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(inputPath);
                    TestCase testCase = new TestCase();
                    testCase.Input = Path.Combine(relativePath, $"{fileNameWithoutExtension}.in");
                    testCase.Output = Path.Combine(relativePath, $"{fileNameWithoutExtension}.out");
                    Problem.TestCases.Add(testCase);
                }
                return Problem;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Problem;
        }
        private static async Task SaveFile(string filePath, IFormFile file)
        {
            // Save the file to the server
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
    }
}
