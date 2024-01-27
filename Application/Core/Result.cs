namespace Application.Core
{
    public class Result<T>
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public int Records { get; set; }
        public int TotalCount { get; set; }
        public int TotalPage { get; set; }

        public bool Succeeded { get; set; }
        public T Data { get; set; }
        public string[] Errors { get; set; }

        public static Result<T> Success(T value) => new Result<T> { Succeeded = true, Data = value };
        public static Result<T> Failure(string[] error) => new Result<T> { Succeeded = false, Errors = error };
    }
}