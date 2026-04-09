namespace CSharpBackend.Data;

using Microsoft.EntityFrameworkCore;
using CSharpBackend.Models.Entities;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Item> Items { get; set; }
}