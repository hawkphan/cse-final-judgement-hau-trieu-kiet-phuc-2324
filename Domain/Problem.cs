using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Problem
{
    [Required]
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Title { get; set; }
    public string Difficulty { get; set; }
    public string Description { get; set; }
    public DateTime Date {get;set;}
}
