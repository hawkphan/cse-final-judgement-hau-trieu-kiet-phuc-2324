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
            // if (!context.Activities.Any()) await seedActivities(context);
            if (context.Problems.Any()) return;
            var seedProblems = new List<Problem>();

            // Seed data for problems
            var problem1 = new Problem
            {
                Id = Guid.NewGuid(),
                UserId = new Guid("B61AF498-A120-4657-B507-DDAA06B614F4"), // Assuming userIds list has at least one user
                Code = "Console.WriteLine('Hello, World!');",
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
                UserId = new Guid("B61AF498-A120-4657-B507-DDAA06B614F4"), // Assuming userIds list has at least one user
                Code = "int result = a + b;",
                Title = "Addition",
                Difficulty = 1.5,
                Description = "Adds two numbers and returns the result.",
                Date = DateTime.Now,
                TimeLimit = 1.5,
                // Add other properties as needed
            };

            // Add more problems as needed

            seedProblems.Add(problem1);
            seedProblems.Add(problem2);


            await context.Problems.AddRangeAsync(seedProblems);
            await context.SaveChangesAsync();

        }
    }
}