using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Domain.Dtos
{
    public class ResultDto
{
    [JsonProperty("stdout")]
    public string Stdout { get; set; }

    [JsonProperty("time")]
    public string Time { get; set; }

    [JsonProperty("memory")]
    public int? Memory { get; set; }

    [JsonProperty("stderr")]
    public string Stderr { get; set; }

    [JsonProperty("token")]
    public string Token { get; set; }

    [JsonProperty("compile_output")]
    public string CompileOutput { get; set; }

    [JsonProperty("message")]
    public string Message { get; set; }

    [JsonProperty("status")]
    public Status Status { get; set; }

    public ResultDto()
    {
        // Set default values if needed
        Stdout = null;
        Time = null;
        Memory = 0;
        Stderr = null;
        Token = null;
        CompileOutput = null;
        Message = null;
        Status = new Status();
    }
}

public class Status
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("description")]
    public string Description { get; set; }

    public Status()
    {
        Id = 0;
        Description = null;
    }
}
}