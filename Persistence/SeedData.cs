using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Persistence
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            String UploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            String TestCasesPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\TestCases");
            String SolutionsPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Solutions");
            String ImagesPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\Images");
            string[] paths = { UploadsPath, TestCasesPath, SolutionsPath, ImagesPath };
            foreach (String p in paths)
            {
                if (!Path.Exists(p))
                {
                    Directory.CreateDirectory(p);
                }
            }

            if (!context.Users.Any())
            {
                var roles = new List<string> { "Admin", "Author", "User" };

                foreach (var roleName in roles)
                {
                    if (!await roleManager.RoleExistsAsync(roleName))
                    {
                        await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));
                    }
                }

                var users = new List<AppUser>{
                    new AppUser{
                        DisplayName = "Kiet Tran",
                        UserName = "kiet",
                        Email = "kiet.tran.cit19@eiu.edu.vn",
                        FirstName = "Kiet",
                        LastName = "Tran",
                        Birthday = new DateTime(2001, 7, 5, 16, 23, 42, DateTimeKind.Utc),
                    },
                    new AppUser{
                        DisplayName = "Trieu Le",
                        UserName = "trieu",
                        Email = "trieu.le.cit19@eiu.edu.vn",
                        FirstName = "Trieu",
                        LastName = "Le",
                        Birthday = new DateTime(2001, 7, 5, 16, 23, 42, DateTimeKind.Utc),
                    },
                    new AppUser{
                        DisplayName = "Hau Phan",
                        UserName = "hau",
                        Email = "hau.phantrung.set19@eiu.edu.vn",
                        FirstName = "Hau",
                        LastName = "Phan",
                        Birthday = new DateTime(2001, 7, 5, 16, 23, 42, DateTimeKind.Utc),
                    },
                    new AppUser{
                        DisplayName = "Phuc Nguyen",
                        UserName = "phuc",
                        Email = "phuc.nguyenmanh@eiu.edu.vn",
                        FirstName = "Kiet",
                        LastName = "Tran",
                        Birthday = new DateTime(1994, 7, 5, 16, 23, 42, DateTimeKind.Utc),
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$word123");
                }

                // Assign specific roles to certain users
                var adminUser = users.Find(u => u.UserName == "phuc");
                if (adminUser != null)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }

                var authorUser = users.Find(u => u.UserName == "trieu");
                if (authorUser != null)
                {
                    await userManager.AddToRoleAsync(authorUser, "Author");
                }

                var authorUser2 = users.Find(u => u.UserName == "kiet");
                if (authorUser2 != null)
                {
                    await userManager.AddToRoleAsync(authorUser2, "Author");
                }

                var normalUser = users.Find(u => u.UserName == "hau");
                if (normalUser != null)
                {
                    await userManager.AddToRoleAsync(normalUser, "User");
                }

                await context.SaveChangesAsync();
            }

            // if (!context.Problems.Any())
            // {
            //     List<AppUser> userList = context.Users.ToList();

            //     IList<Guid> listId = new List<Guid>();
            //     for (int i = 0; i < userList.Count; i++)
            //     {
            //         listId.Add(userList[i].Id);
            //     }


            //     var seedProblems = new List<Problem>();

            //     // Seed data for problems
            //     var problemData = new[]
            //     {
            //         new
            //         {
            //             UserId = listId[0],
            //             Code = "HELLO",
            //             Title = "Hello World",
            //             Difficulty = 1.0,
            //             Description = "Prints 'Hello, World!' to the console.",
            //             TimeLimit = 2,
            //         },
            //         new
            //         {
            //             UserId = listId[1],
            //             Code = "ADD",
            //             Title = "Addition",
            //             Difficulty = 1.0,
            //             Description = "Adds two numbers and returns the result.",
            //             TimeLimit = 1,
            //         }
            //     };

            //     foreach (var data in problemData)
            //     {
            //         var problem = new Problem
            //         {
            //             Id = Guid.NewGuid(),
            //             UserId = data.UserId,
            //             Code = data.Code,
            //             Title = data.Title,
            //             Difficulty = data.Difficulty,
            //             Description = data.Description,
            //             Date = DateTime.Now,
            //             TimeLimit = (int)data.TimeLimit,
            //             // Add other properties as needed
            //         };

            //         seedProblems.Add(problem);
            //     }

            //     await context.Problems.AddRangeAsync(seedProblems);
            //     await context.SaveChangesAsync();
            // }
        }
    }
}