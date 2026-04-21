namespace CSharpBackend.Data;

using Microsoft.EntityFrameworkCore;
using CSharpBackend.Models.Entities;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Item> Items { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Item>().ToTable("Item");
        modelBuilder.Entity<Item>().HasKey(item => item.Id);
    }
}
