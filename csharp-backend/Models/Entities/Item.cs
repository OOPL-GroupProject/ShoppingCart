namespace CSharpBackend.Models.Entities;

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

[Keyless]
[Table("Item")]
public class Item
{
    public string Name { get; set; } = string.Empty;
    public int Type { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string? Description { get; set; }
}