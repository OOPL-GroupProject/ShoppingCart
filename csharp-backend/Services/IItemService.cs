namespace CSharpBackend.Services;

using CSharpBackend.Models.DTOs;

public interface IItemService
{
    Task<IReadOnlyCollection<ItemResponseDto>> GetAllItemsAsync();
    Task<ItemResponseDto?> GetItemByIdAsync(int id);
    Task<ItemResponseDto> CreateItemAsync(CreateItemRequestDto request);
}
