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
    public double PrivacyStatus { get; set; } // 0 for Public, 1 for Private
    public string Description { get; set; }
    public DateTime Date { get; set; }
    //kilobyte Limit address space of the program in kilobytes.	
    public int MemoryLimit { get; set; }
    public int TimeLimit { get; set; }
    //0 is without space
    public int GradeMode { get; set; }
    public double ApproximateRate { get; set; }
    public List<TestCase> TestCases { get; set; }
    public List<Result> Results { get; set; }
    public List<Solution> Solutions { get; set; }
    public List<ProblemLanguage> ProblemLanguages { get; set; } = new List<ProblemLanguage>();
    public List<ContestProblem> ProblemContests { get; set; } = new List<ContestProblem>();

}
