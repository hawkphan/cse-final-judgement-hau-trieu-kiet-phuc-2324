using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Problem
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public AppUser User { get; set; }
    public string Code { get; set; }
    public string Title { get; set; }
    public double Difficulty { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    //kilobyte Limit address space of the program in kilobytes.	
    public int MemoryLimit { get; set; }
    public int TimeLimit { get; set; }
    //0 is without space
    public int GradeMode { get; set; }

    public ICollection<TestCase> TestCases { get; set; }
    public ICollection<Result> Results { get; set; }
    public ICollection<Solution> Solutions { get; set; }
    public ICollection<ProblemLanguage> ProblemLanguages { get; set; }
    public ICollection<ContestProblem> ProblemContests { get; set; }
}
