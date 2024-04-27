using System.Text;
using Flurl.Http;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace Application.Core
{
    public class Judge0
    {
        private readonly String serverAddress = "http://192.168.56.102:2358/";
        private HttpClient client;
        public String SubmissionParam()
        {
            return serverAddress + "";
        }
        public async Task<string> SendGetRequest(String param)
        {
            client = new HttpClient();
            using var response = await client.GetAsync(serverAddress + param);
            response.EnsureSuccessStatusCode();
            string jsonContent = await response.Content.ReadAsStringAsync();
            return jsonContent;
        }
        public async Task<string> SendPostRequest(string url, string jsonContent)
        {
            client = new HttpClient();

            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            using var response = await client.PostAsync(SubmissionParam() + url, content);

            response.EnsureSuccessStatusCode();

            string responseContent = await response.Content.ReadAsStringAsync();

            return responseContent;
        }


    }
}
