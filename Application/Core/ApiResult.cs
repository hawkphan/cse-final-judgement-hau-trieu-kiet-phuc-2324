namespace Application.Core
{
    public class ApiResult<T>
    {
        public bool Succeeded { get; set; }
        public T Data { get; set; }
        public string[] Errors { get; set; }

        public static ApiResult<T> Success(T value) => new ApiResult<T> { Succeeded = true, Data = value, Errors = new string[]{} };
        public static ApiResult<T> Failure(string[] error) => new ApiResult<T> { Succeeded = false, Errors = error };
    }
}