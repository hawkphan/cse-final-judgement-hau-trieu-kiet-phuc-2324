using System.Text.Json.Serialization;
using Newtonsoft.Json;
namespace Domain
{
    public class Judge0ResultDto
    {
        [JsonProperty("source_code")]
        [JsonPropertyName("source_code")]
        public string Content { get; set; }

        [JsonProperty("language_id")]
        [JsonPropertyName("language_id")]
        public int LanguageId { get; set; }

        [JsonProperty("stdin")]
        [JsonPropertyName("stdin")]
        public string Input { get; set; }

        [JsonProperty("expected_output")]
        [JsonPropertyName("expected_output")]
        public string ExpectedOutput { get; set; }
    }
}