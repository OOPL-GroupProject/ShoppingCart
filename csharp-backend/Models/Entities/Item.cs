namespace CSharpBackend.Models.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CSharpBackend.Models.Enums;

[Table("Item")]
public class Item
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public ItemType Type { get; set; }

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public string? Description { get; set; }
}
