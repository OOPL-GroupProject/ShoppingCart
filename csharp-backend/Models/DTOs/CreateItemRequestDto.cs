namespace CSharpBackend.Models.DTOs;

using System.ComponentModel.DataAnnotations;

public class CreateItemRequestDto
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public int Type { get; set; }

    [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; }

    [MaxLength(2000)]
    public string? Description { get; set; }
}
