namespace CSharpBackend.Services;

using CSharpBackend.Models.DTOs;
using CSharpBackend.Models.Domain;
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
        return items
            .Select(MapEntityToDomain)
            .Select(MapDomainToResponse)
            .ToList();
    }

    public async Task<ItemResponseDto?> GetItemByIdAsync(int id)
    {
        var item = await _repository.GetItemByIdAsync(id);
        if (item is null)
        {
            return null;
        }

        var itemDomain = MapEntityToDomain(item);
        return MapDomainToResponse(itemDomain);
    }

    public async Task<ItemResponseDto> CreateItemAsync(CreateItemRequestDto request)
    {
        var itemDomain = MapCreateRequestToDomain(request);
        var item = MapDomainToEntity(itemDomain);

        var createdItem = await _repository.CreateItemAsync(item);
        var createdItemDomain = MapEntityToDomain(createdItem);
        return MapDomainToResponse(createdItemDomain);
    }

    public async Task<bool> DeleteItemAsync(int id)
    {
        return await _repository.DeleteItemAsync(id);
    }

    private static ItemDomain MapEntityToDomain(Item item)
    {
        return new ItemDomain
        {
            Id = item.Id,
            Name = item.Name,
            Type = item.Type,
            Price = item.Price,
            Quantity = item.Quantity,
            Description = item.Description
        };
    }

    private static ItemDomain MapCreateRequestToDomain(CreateItemRequestDto request)
    {
        return new ItemDomain
        {
            Name = request.Name.Trim(),
            Type = request.Type,
            Price = request.Price,
            Quantity = request.Quantity,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim()
        };
    }

    private static Item MapDomainToEntity(ItemDomain itemDomain)
    {
        return new Item
        {
            Id = itemDomain.Id,
            Name = itemDomain.Name,
            Type = itemDomain.Type,
            Price = itemDomain.Price,
            Quantity = itemDomain.Quantity,
            Description = itemDomain.Description
        };
    }

    private static ItemResponseDto MapDomainToResponse(ItemDomain itemDomain)
    {
        return new ItemResponseDto
        {
            Id = itemDomain.Id,
            Name = itemDomain.Name,
            Type = itemDomain.Type,
            Price = itemDomain.Price,
            Quantity = itemDomain.Quantity,
            Description = itemDomain.Description
        };
    }
}
