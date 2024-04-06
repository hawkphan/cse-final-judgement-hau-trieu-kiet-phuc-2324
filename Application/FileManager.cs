using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Application.Solutions
{
    public class FileManager
    {
        public readonly String CurrentDirectory = Directory.GetCurrentDirectory();
        public readonly String UploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        public readonly String TestCasesPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\TestCases");
        public readonly String SolutionsPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Solutions");
        public readonly String ImagesPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Images");
        public string WriteAndSaveSolutions(String solution, String SolutionId, String fileExtension)
        {
            string SolutionFileName = $"main.{fileExtension}";
            string SolutionFolderName = Path.Combine(SolutionsPath, SolutionId);
            String path = Path.Combine(SolutionFolderName, SolutionFileName);
            Directory.CreateDirectory(SolutionFolderName);
            try
            {
                using (StreamWriter writer = new StreamWriter(path))
                {
                    writer.WriteLine(solution);
                }
                Console.WriteLine("Data written to file successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
            return path;
        }
        public async void SaveFile(IFormFile file, String FolderPath, Guid id)
        {
            string location = Path.Combine(FolderPath, $"{id}.jpg");
            using (var stream = new FileStream(location, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
        public async Task SaveAndExtractZipFile(IFormFile file, String ProblemCode)
        {
            if (IsZipMimeType(file.ContentType))
            {
                var zipFilePath = Path.Combine(TestCasesPath, $"{ProblemCode}.zip");
                var unzipPath = Path.Combine(TestCasesPath, ProblemCode);

                using (var stream = new FileStream(zipFilePath, FileMode.Create))
                {
                    //Saving the zip file
                    await file.CopyToAsync(stream);
                }
                ExtractToDirectory(unzipPath, zipFilePath);
            }
        }
        private static void ExtractToDirectory(String unzipPath, String zipFilePath)
        {
            //clear directory before unziping
            if (!Directory.Exists(unzipPath))
            {
                Directory.CreateDirectory(unzipPath);
            }
            else
            {
                string[] filePaths = Directory.GetFiles(unzipPath);
                for (int i = 0; i < filePaths.Length; i++)
                {
                    System.IO.File.Delete(filePaths[i]);
                }
            }
            ZipFile.ExtractToDirectory(zipFilePath, unzipPath);
        }
        public string[] getFileNameInFolder(String FolderPath, String Pattern)
        {
            // var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            var targetFolder = Path.Combine(Directory.GetCurrentDirectory(), FolderPath);

            var InputFiles = Directory.GetFiles(targetFolder, Pattern);
    

            return InputFiles;
        }
        public string getTestCaseContent(String TestCasesPath)
        {
            string contents = File.ReadAllText(Path.Combine(CurrentDirectory, TestCasesPath));
            return contents;
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
    }
}