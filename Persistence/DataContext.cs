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
        public DbSet<Contest> Contests { get; set; }
        public DbSet<ContestMember> ContestMembers { get; set; }
        public DbSet<ContestProblem> ContestProblems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Configure primary keys
            builder.Entity<Language>().HasKey(x => x.Id);
            builder.Entity<ProblemLanguage>().HasKey(x => x.Id);

            // Configure foreign keys
            builder.Entity<ProblemLanguage>()
                .HasOne(pl => pl.Problem)
                .WithMany(p => p.ProblemLanguages)
                .HasForeignKey(pl => pl.ProblemId);

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

            // Configure Contest Member foreign key
            builder.Entity<ContestMember>()
                .HasOne(cm => cm.User)
                .WithMany(u => u.MemberContests)
                .HasForeignKey(cm => cm.UserId);

            builder.Entity<ContestMember>()
                .HasOne(cm => cm.Contest)
                .WithMany(c => c.Members)
                .HasForeignKey(cm => cm.ContestId);

            // Configure Contest Problem foreign key
            builder.Entity<ContestProblem>()
                .HasOne(cm => cm.Problem)
                .WithMany(u => u.ProblemContests)
                .HasForeignKey(cm => cm.ProblemId);

            builder.Entity<ContestProblem>()
                .HasOne(cm => cm.Contest)
                .WithMany(c => c.Problems)
                .HasForeignKey(cm => cm.ContestId);

            // Configure Contest keys

            builder.Entity<Contest>()
                .HasKey(p => p.Id);

            builder.Entity<ContestMember>()
            .HasKey(p => p.Id);

            builder.Entity<ContestProblem>()
            .HasKey(p => p.Id);

            base.OnModelCreating(builder);
        }
    }
}
