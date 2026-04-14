namespace CSharpBackend.Repositories;

using CSharpBackend.Models.Entities;

public interface IItemRepository
{
    Task<List<Item>> GetAllItemsAsync();
    Task<Item?> GetItemByIdAsync(int id);
    Task<Item> CreateItemAsync(Item item);
}
