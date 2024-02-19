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
        public async Task<ActionResult<Problem>> GetProblem(Guid id)
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
                // Ensure the file is a ZIP file
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
                List<TestCase> testCases = new List<TestCase>();
                foreach (var inputPath in files)
                {
                    var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(inputPath);
                    var outputPath = Path.Combine(unzipPath, $"{fileNameWithoutExtension}.out");
                    TestCase testCase = new TestCase();
                    testCase.Input = inputPath;
                    testCase.Output = outputPath;
                    newProblem.TestCases.Add(testCase);
                }
                await Mediator.Send(new Create.Command { Problem = newProblem});

                return Ok($"File '{file.FileName}' uploaded successfully. Saved as '{fileName}'");
            }




            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }


        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(Guid id, Problem problem)
        {
            problem.Id = id;
            await Mediator.Send(new Edit.Command { Problem = problem });

            return Ok();
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
