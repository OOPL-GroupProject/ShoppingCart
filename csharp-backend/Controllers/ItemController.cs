namespace CSharpBackend.Controllers;

using Microsoft.AspNetCore.Mvc;
using CSharpBackend.Repositories;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly ItemRepository _repository;

    public ItemsController(ItemRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetItems()
    {
        var items = await _repository.GetAllItemsAsync();
        return Ok(items);
    }
}