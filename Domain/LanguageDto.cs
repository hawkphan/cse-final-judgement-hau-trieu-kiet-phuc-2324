using System.Text.Json.Serialization;
namespace Domain
{
    public class LanguageDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}