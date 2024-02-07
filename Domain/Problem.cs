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
    public double TimeLimit { get; set; }
    public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
    public ICollection<Result> Results { get; set; } = new List<Result>();
    public ICollection<Solution> Solutions { get; set; } = new List<Solution>();
    public ICollection<ProblemLanguage> ProblemLanguages { get; set; } = new List<ProblemLanguage>();
}
