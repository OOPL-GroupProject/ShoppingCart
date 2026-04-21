namespace CSharpBackend.Controllers;

using CSharpBackend.Models.DTOs;
using CSharpBackend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
public class ItemController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet("api/items")]
    [ProducesResponseType(typeof(IReadOnlyCollection<ItemResponseDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyCollection<ItemResponseDto>>> GetItems()
    {
        var items = await _itemService.GetAllItemsAsync();
        return Ok(items);
    }

    [HttpGet("api/items/{id:int}")]
    [ProducesResponseType(typeof(ItemResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ItemResponseDto>> GetItemById(int id)
    {
        var item = await _itemService.GetItemByIdAsync(id);
        if (item is null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost("api/items")]
    [ProducesResponseType(typeof(ItemResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ItemResponseDto>> CreateItem([FromBody] CreateItemRequestDto request)
    {
        var createdItem = await _itemService.CreateItemAsync(request);
        return CreatedAtAction(nameof(GetItemById), new { id = createdItem.Id }, createdItem);
    }

    [HttpDelete("api/items/{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var wasDeleted = await _itemService.DeleteItemAsync(id);
        if (!wasDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
