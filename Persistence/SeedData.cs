using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!context.Users.Any())
            {
                var users = new List<AppUser>{
                new AppUser{
                    DisplayName = "Kiet Tran",
                    UserName = "kiet",
                    Email = "kiet.tran.cit19@eiu.edu.vn"
                },new AppUser{
                    DisplayName = "Trieu Le",
                    UserName = "trieu",
                    Email = "trieu.le.cit19@eiu.edu.vn"
                },new AppUser{
                    DisplayName = "Hau Phan",
                    UserName = "hau",
                    Email = "hau.phantrung.set19@eiu.edu.vn"
                },new AppUser{
                    DisplayName = "Phuc Nguyen",
                    UserName = "phuc",
                    Email = "phuc.nguyenmanh@eiu.edu.vn"
                }
            };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$word123");
                }
                await context.SaveChangesAsync();
            }

            if (!context.Problems.Any())
            {
                List<AppUser> userList = context.Users.ToList();

                IList<Guid> listId = new List<Guid>();
                for (int i = 0; i < userList.Count; i++)
                {
                    listId.Add(userList[i].Id);
                }


                var seedProblems = new List<Problem>();

                // Seed data for problems
                var problemData = new[]
                {
                    new
                    {
                        UserId = listId[0],
                        Code = "HELLO",
                        Title = "Hello World",
                        Difficulty = 1.0,
                        Description = "Prints 'Hello, World!' to the console.",
                        TimeLimit = 2,
                    },
                    new
                    {
                        UserId = listId[1],
                        Code = "ADD",
                        Title = "Addition",
                        Difficulty = 1.0,
                        Description = "Adds two numbers and returns the result.",
                        TimeLimit = 1,
                    }
                };

                foreach (var data in problemData)
                {
                    var problem = new Problem
                    {
                        Id = Guid.NewGuid(),
                        UserId = data.UserId,
                        Code = data.Code,
                        Title = data.Title,
                        Difficulty = data.Difficulty,
                        Description = data.Description,
                        Date = DateTime.Now,
                        TimeLimit = (int)data.TimeLimit,
                        // Add other properties as needed
                    };

                    seedProblems.Add(problem);
                }

                await context.Problems.AddRangeAsync(seedProblems);
                await context.SaveChangesAsync();
            };


        }
    }
}