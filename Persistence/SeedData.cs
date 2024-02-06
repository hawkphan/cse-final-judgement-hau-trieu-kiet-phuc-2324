using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!context.Users.Any())
            {
                var users = new List<AppUser>{
                new AppUser{
                    DisplayName = "Kiet",
                    UserName = "kiet",
                    Email = "kiet@eiu.edu.vn"
                },new AppUser{
                    DisplayName = "Trieu",
                    UserName = "Trieu",
                    Email = "Trieu.le@eiu.edu.vn"
                },new AppUser{
                    DisplayName = "Hau",
                    UserName = "hau",
                    Email = "hau.phantrung.set19@eiu.edu.vn"
                },new AppUser{
                    DisplayName = "Phuc",
                    UserName = "Phuc",
                    Email = "hau.phantrung.set19@eiu.edu.vn"
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
                List<AppUser> userlist = context.Users.ToList();

                IList<Guid> listId = new List<Guid>();
                for (int i = 0; i < userlist.Count; i++)
                {
                    listId.Add(userlist[i].Id);
                }


                var seedProblems = new List<Problem>();

                // Seed data for problems
                var problem1 = new Problem
                {
                    Id = Guid.NewGuid(),
                    UserId = listId[0],
                    Code = "HELLO",
                    Title = "Hello World",
                    Difficulty = 1.0,
                    Description = "Prints 'Hello, World!' to the console.",
                    Date = DateTime.Now,
                    TimeLimit = 2.0,
                    // Add other properties as needed
                };

                var problem2 = new Problem
                {
                    Id = Guid.NewGuid(),
                    UserId = listId[1],
                    Code = "ADD",
                    Title = "Addition",
                    Difficulty = 1.5,
                    Description = "Adds two numbers and returns the result.",
                    Date = DateTime.Now,
                    TimeLimit = 1.5,
                };

                seedProblems.Add(problem1);
                seedProblems.Add(problem2);

                await context.Problems.AddRangeAsync(seedProblems);
                await context.SaveChangesAsync();
            };


        }
    }
}