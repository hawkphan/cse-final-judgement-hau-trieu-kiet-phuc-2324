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
    public int MemoryLimit { get; set; } = 128000;
    public int TimeLimit { get; set; }
    //0 is without space
    public int GradeMode { get; set; } = 0;

    public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
    public ICollection<Result> Results { get; set; } = new List<Result>();
    public ICollection<Solution> Solutions { get; set; } = new List<Solution>();
    public ICollection<ProblemLanguage> ProblemLanguages { get; set; } = new List<ProblemLanguage>();
    public ICollection<ContestProblem> ProblemContests { get; set; }
}
