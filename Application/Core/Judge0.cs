using System.Text;
using System.Text.RegularExpressions;
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
        //         options={[
        //   { label: "Approximate", value: "0" },
        //   { label: "Absolute", value: "1" },
        //   { label: "Without Space", value: "2" },
        // ]}
        public static bool Grade(int mode, string expectedOutput, string submittedOutput, double ApproximateRate)
        {
            switch (mode)
            {
                //to be working on approximately
                case 0:
                    return AbsoluteComparison(expectedOutput, submittedOutput);
                // return ApproximateComparison(expectedOutput, expectedOutput, ApproximateRate);
                case 1:
                    //absolute
                    return AbsoluteComparison(expectedOutput, submittedOutput);
                case 2:
                    return AbsoluteComparisonWithoutSpace(expectedOutput, submittedOutput);
                default:
                    return AbsoluteComparison(expectedOutput, submittedOutput);

            }
        }
        public static bool AbsoluteComparison(string expectedOutput, string submittedOutput)
        {
            string[] file1 = expectedOutput.Split("\n"); ;
            string[] file2 = submittedOutput.Split("\n"); ;
            if (file1.Length != file2.Length)
                return false;
            int count = file1.Length;
            for (int i = 0; i < count; i++)
            {
                if (!file1[i].Equals(file2[i]))
                {
                    return false;
                }
            }
            return true;
        }
        public static bool AbsoluteComparisonWithoutSpace(string expectedOutput, string submittedOutput)
        {
            string[] whitespaceChars = new string[] { Environment.NewLine, " ", "\n", "\r", "\t", "\r\n" };
            // using the method 
            String[] file1 = expectedOutput.Split(whitespaceChars, StringSplitOptions.RemoveEmptyEntries);
            String[] file2 = submittedOutput.Split(whitespaceChars, StringSplitOptions.RemoveEmptyEntries);
            if (file1.Length != file2.Length)
                return false;
            for (int i = 0; i < file1.Length; i++)
            {
                if (file1[i].Equals(file2[i]))
                    continue;
                else
                    return false;
            }
            return true;
        }
        public static bool ApproximateComparison(string expectedOutput, string submittedOutput, double check)
        {

            string[] file1 = expectedOutput.Split("\n");
            string[] file2 = submittedOutput.Split("\n");
            if (file1.Length != file2.Length)
                return false;

            for (int i = 0; i < file1.Length; i++)
            {
                string[] lineSplit1 = file1[i].Split(' ');
                string[] lineSplit2 = file2[i].Split(' ');
                if (lineSplit1.Length != lineSplit2.Length)
                    return false;
                for (int j = 0; j < lineSplit1.Length; j++)
                {
                    string s1 = lineSplit1[j];
                    string s2 = lineSplit2[j];

                    if (checkDigit(s1) && checkDigit(s2) && !s1.StartsWith(".") && !s2.StartsWith("."))
                    {

                        if (Math.Abs(Double.Parse(s1) - Double.Parse(s2)) > check)
                        {
                            return false;
                        }
                    }
                    else if (!s1.Equals(s2))
                    {
                        return false;
                    }
                }
            }
            return true;
        }
        private static Boolean checkDigit(String s)
        {
            return (Double.TryParse(s, out double result));
        }

    }
}
