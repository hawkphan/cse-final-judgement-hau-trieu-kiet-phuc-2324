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
            // if (!userManager.Users.Any()) await SeedAccounts(context,userManager);
            // if (!context.Activities.Any()) await seedActivities(context);
            if (!context.Problems.Any()) await seedProblems(context);

        }
        static async Task SeedAccounts(DataContext context, UserManager<AppUser> userManager)
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
                }
            };
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$word123");
                Console.WriteLine(user.UserName + "seeded");
            }
            await context.SaveChangesAsync();

        }
        static async Task seedProblems(DataContext context)
        {
            var problems = new List<Problem>{
                new Problem{
                    Title= "Trộm nhà thầy Ngọc",
                    Code="THIEF2",
                    Description="Tân hôm nay đi ăn trộm nhà thầy, Tân cần bạn vận dụng kiến thức quy hoạch động để trộm được nhiều giá trị nhất có thể",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },new Problem{
                    Title= "Trộm nhà thầy Giàu",
                    Code="THIEF3",
                    Description="Tân hôm nay đi ăn trộm nhà thầy, Tân cần bạn vận dụng kiến thức quy hoạch động để trộm được nhiều giá trị nhất có thể",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },new Problem{
                    Title= "Trộm nhà thầy Phúc",
                    Code="THIEF4",
                    Description="Tân hôm nay đi ăn trộm nhà thầy, Tân cần bạn vận dụng kiến thức quy hoạch động để trộm được nhiều giá trị nhất có thể",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },new Problem{
                    Title= "Trộm nhà thầy Cường",
                    Code="THIEF5",
                    Description="Tân hôm nay đi ăn trộm nhà thầy ngọc, Tân cần bạn vận dụng kiến thức quy hoạch động để trộm được nhiều giá trị nhất có thể",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },new Problem{
                    Title= "Trộm nhà thầy Huấn",
                    Code="THIEF6",
                    Description="Tân hôm nay đi ăn trộm nhà thầy, Tân cần bạn vận dụng kiến thức quy hoạch động để trộm được nhiều giá trị nhất có thể",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },new Problem{
                    Title= "Trộm nhà thầy Phước",
                    Code="THIEF7",
                    Description="Tân hôm nay đi ăn trộm nhà thầy, Tân cần bạn vận dụng kiến thức quy hoạch động để trộm được nhiều giá trị nhất có thể",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },new Problem{
                    Title= "Trộm nhà thầy Tài",
                    Code="THIEF8",
                    Description="Tân hôm nay đi ăn trộm nhà thầy, Tân cần bạn vận dụng kiến thức quy hoạch động để trộm được nhiều giá trị nhất có thể",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },
                new Problem{
                    Title= "Trộm nhà thầy Phát",
                    Code="THIEF",
                    Description="Trộm nốt cho đủ KPI",
                    Difficulty="easy",
                    Date=DateTime.UtcNow
                },
            };

            await context.Problems.AddRangeAsync(problems);
            await context.SaveChangesAsync();
        }
        static async Task seedActivities(DataContext context)
        {

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}