using System.IO.Compression;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class FilesController : BaseApiController
    {
        //api/files
        [AllowAnonymous]
        [HttpGet]
        public ActionResult test()
        {
            return Ok("hello there");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> ImportFile([FromForm] IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("File is null or empty");
                }

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

                // var fileName = $"{Guid.NewGuid()}.zip";
                var fileName = file.FileName;

                // Combine the directory path with the file name
                var filePath = Path.Combine(uploadsFolder, fileName);
                var unzipPath = Path.Combine(uploadsFolder, fileName.Substring(0, fileName.Length - 4));

                // Save the file to the server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                ZipFile.ExtractToDirectory(filePath, unzipPath);

                return Ok($"File '{file.FileName}' uploaded successfully. Saved as '{fileName}'");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
