namespace Application.Core
{
    public class Result<T>
    {
        public int pageNo { get; set; }
        public int pageSize { get; set; }
        public int records { get; set; }
        public int totalCount { get; set; }
        public int totalPage { get; set; }

        public bool IsSuccess { get; set; }
        public T Data { get; set; }
        public string Error { get; set; }

        public static Result<T> Success(T value) => new Result<T> { IsSuccess = true, Data = value };
        public static Result<T> Failure(string error) => new Result<T> { IsSuccess = false, Error = error };
    }
}