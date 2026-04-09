namespace CSharpBackend.Repositories;

using Microsoft.EntityFrameworkCore;
using CSharpBackend.Data;
using CSharpBackend.Models.Entities;

public class ItemRepository
{
    private readonly ApplicationDbContext _context;

    public ItemRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Item>> GetAllItemsAsync()
    {
        return await _context.Items.ToListAsync();
    }
}