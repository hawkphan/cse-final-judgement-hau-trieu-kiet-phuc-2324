using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Problem
{
    [Required]
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Title { get; set; }
    public double Difficulty { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public double TimeLimit { get; set; }
    public Solution IntendedSolution { get; set; }
    public ICollection<String> TestCases { get; set; }
    public ICollection<Solution> UserSolutions { get; set; }


}
