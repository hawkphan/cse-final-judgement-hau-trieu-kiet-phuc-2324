using System.Text.Json.Serialization;
namespace Domain
{
    public class LanguageDto
    {
        [property: JsonPropertyName("id")] public int Id { get; set; }
        [property: JsonPropertyName("name")] public string Name { get; set; }
    }
}