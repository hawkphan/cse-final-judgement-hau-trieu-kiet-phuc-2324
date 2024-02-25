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
                return BadRequest("File is null or empty");
            }
            try
            {
                if (!file.ContentType.Equals("application/zip", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Unsupported file format. Only ZIP files are allowed.");
                }

                // Define the directory where the file will be saved
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var fileName = $"{newProblem.Code}.zip";

                // Combine the directory path with the file name
                var filePath = Path.Combine(uploadsFolder, fileName);
                var unzipPath = Path.Combine(uploadsFolder, fileName.Substring(0, fileName.Length - 4));

                // Save the file to the server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                ZipFile.ExtractToDirectory(filePath, unzipPath);

                // Create TestCase Object From 
                var files = Directory.GetFiles(unzipPath, "*.in");
                foreach (var inputPath in files)
                {
                    var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(inputPath);
                    var outputPath = Path.Combine(unzipPath, $"{fileNameWithoutExtension}.out");
                    TestCase testCase = new TestCase();
                    testCase.Input = inputPath;
                    testCase.Output = outputPath;
                    newProblem.TestCases.Add(testCase);
                }

                return HandleResult(await Mediator.Send(new Create.Command { Problem = newProblem }));
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
                try
                {
                    if (!file.ContentType.Equals("application/zip", StringComparison.OrdinalIgnoreCase))
                    {
                        return BadRequest("Unsupported file format. Only ZIP files are allowed.");
                    }

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
                        // Directory.Delete(Path.Combine(uploadsFolder, Problem.Code));
                        string[] filePaths = Directory.GetFiles(unzipPath);
                        for (int i = 0; i < filePaths.Length; i++)
                        {
                            System.IO.File.Delete(filePaths[i]);
                        }
                    }
                    // Save the file to the server
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    Directory.CreateDirectory(unzipPath);
                    ZipFile.ExtractToDirectory(filePath, unzipPath);

                    // Create TestCase Object From 
                    var files = Directory.GetFiles(unzipPath, "*.in");
                    foreach (var inputPath in files)
                    {
                        var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(inputPath);
                        var outputPath = Path.Combine(unzipPath, $"{fileNameWithoutExtension}.out");
                        TestCase testCase = new TestCase();
                        testCase.Input = inputPath;
                        testCase.Output = outputPath;
                        Problem.TestCases.Add(testCase);
                    }
                    return HandleResult(await Mediator.Send(new Edit.Command { Problem = Problem }));
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
                }
            }
            return HandleResult(await Mediator.Send(new Edit.Command { Problem = Problem }));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }
    }
}
