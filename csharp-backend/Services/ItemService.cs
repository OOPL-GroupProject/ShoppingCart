namespace CSharpBackend.Services;

using CSharpBackend.Models.DTOs;
using CSharpBackend.Models.Entities;
using CSharpBackend.Repositories;

public class ItemService : IItemService
{
    private readonly IItemRepository _repository;

    public ItemService(IItemRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyCollection<ItemResponseDto>> GetAllItemsAsync()
    {
        var items = await _repository.GetAllItemsAsync();
        return items.Select(MapToResponse).ToList();
    }

    public async Task<ItemResponseDto?> GetItemByIdAsync(int id)
    {
        var item = await _repository.GetItemByIdAsync(id);
        return item is null ? null : MapToResponse(item);
    }

    public async Task<ItemResponseDto> CreateItemAsync(CreateItemRequestDto request)
    {
        var item = new Item
        {
            Name = request.Name.Trim(),
            Type = request.Type,
            Price = request.Price,
            Quantity = request.Quantity,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim()
        };

        var createdItem = await _repository.CreateItemAsync(item);
        return MapToResponse(createdItem);
    }

    private static ItemResponseDto MapToResponse(Item item)
    {
        return new ItemResponseDto
        {
            Id = item.Id,
            Name = item.Name,
            Type = item.Type,
            Price = item.Price,
            Quantity = item.Quantity,
            Description = item.Description
        };
    }
}
