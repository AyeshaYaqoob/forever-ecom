namespace ForeverEcom.Application.Common;

public class PagedResult<T>
{
    public bool Success { get; set; } = true;
    public int Count { get; set; }
    public int Total { get; set; }
    public int TotalPages { get; set; }
    public int CurrentPage { get; set; }
    public T Items { get; set; } = default!;
}
