using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class Language
    {
        [property: JsonPropertyName("id")] public int Id { get; set; }
        public ICollection<ProblemLanguage> ProblemLanguages { get; set; }
        [property: JsonPropertyName("name")] public string Name { get; set; }
        public string FileExtension { get; set; }
    }
}