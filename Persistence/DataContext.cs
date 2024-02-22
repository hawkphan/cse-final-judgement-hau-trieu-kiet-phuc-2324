using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Problem> Problems { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<ProblemLanguage> ProblemLanguages { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Solution> Solutions { get; set; }
        public DbSet<TestCase> TestCases { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Configure primary keys
            builder.Entity<Language>().HasKey(x => x.Id);
            builder.Entity<ProblemLanguage>()
                .HasKey(pl => new { pl.ProblemId, pl.LanguageId });

            // Configure foreign keys
            builder.Entity<ProblemLanguage>()
                .HasOne(pl => pl.Problem)
                .WithMany(p => p.ProblemLanguages)
                .HasForeignKey(pl => pl.ProblemId);

            builder.Entity<ProblemLanguage>()
                .HasOne(pl => pl.Language)
                .WithMany(l => l.ProblemLanguages)
                .HasForeignKey(pl => pl.LanguageId);


            // Configure Result entity
            builder.Entity<Result>()
                .HasKey(r => r.Id);

            builder.Entity<Result>()
                .HasOne(r => r.Solution)
                .WithMany(s => s.Results)
                .HasForeignKey(r => r.SolutionId);

            builder.Entity<Result>()
                .HasOne(r => r.TestCase)
                .WithMany(tc => tc.Results)
                .HasForeignKey(r => r.TestCaseId);
            // Configure TestCase entity
            builder.Entity<TestCase>()
                .HasKey(tc => tc.Id);

            builder.Entity<TestCase>()
                .HasOne(tc => tc.Problem)
                .WithMany(p => p.TestCases)
                .HasForeignKey(tc => tc.ProblemId);
            // Configure Solution entity
            builder.Entity<Solution>()
                .HasKey(s => s.Id);

            builder.Entity<Solution>()
                .HasOne(s => s.User)
                .WithMany(u => u.Solutions)
                .HasForeignKey(s => s.UserId);

            builder.Entity<Solution>()
                .HasOne(s => s.Problem)
                .WithMany(p => p.Solutions)
                .HasForeignKey(s => s.ProblemId);
            // Configure Problem entity
            builder.Entity<Problem>()
                .HasKey(p => p.Id);
            builder.Entity<Problem>()
                .HasIndex(p => p.Code)
                .IsUnique();
            builder.Entity<Problem>()
                .HasOne(p => p.User)
                .WithMany(u => u.Problems)
                .HasForeignKey(p => p.UserId);
            builder.Entity<Problem>()
                .HasMany(t => t.TestCases)
                .WithOne(u => u.Problem)
                .HasForeignKey(p => p.ProblemId);


            base.OnModelCreating(builder);
        }
    }
}
