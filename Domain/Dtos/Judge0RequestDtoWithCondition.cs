using System.Text.Json.Serialization;
using Newtonsoft.Json;
namespace Domain
{
    public class Judge0RequestDtoWithCondition
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

        [JsonProperty("stack_limit")]
        [JsonPropertyName("stack_limit")]
        public long StackLimit { get; set; }

        [JsonProperty("cpu_time_limit")]
        [JsonPropertyName("cpu_time_limit")]
        public float TimeLimit { get; set; }

        [JsonProperty("cpu_extra_time")]
        [JsonPropertyName("cpu_extra_time")]
        public float ExtraTime { get; set; }

        [JsonProperty("enable_per_process_and_thread_time_limit")]
        [JsonPropertyName("enable_per_process_and_thread_time_limit")]
        public bool EnableTimeLimit { get; set; }

        [JsonProperty("memory_limit")]
        [JsonPropertyName("memory_limit")]
        public long MemoryLimit { get; set; }


        [JsonProperty("wall_time_limit")]
        [JsonPropertyName("wall_time_limit")]
        public float WallTimeLimit { get; set; } = 100000;

        [JsonProperty("enable_per_process_and_or_thread_memory_limit")]
        [JsonPropertyName("enable_per_process_and_or_thread_memory_limit")]
        public bool EnableMemoryLimit { get; set; }


    }
}