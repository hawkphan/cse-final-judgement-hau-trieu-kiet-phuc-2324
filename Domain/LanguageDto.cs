using System.Text.Json.Serialization;
namespace Domain
{
    public class LanguageDto
    {
        public Guid Id;
        public string Name { get; set; }
    }
}