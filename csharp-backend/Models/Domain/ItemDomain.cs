namespace CSharpBackend.Models.Domain;

using CSharpBackend.Models.Enums;

public class ItemDomain
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ItemType Type { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string? Description { get; set; }
}
