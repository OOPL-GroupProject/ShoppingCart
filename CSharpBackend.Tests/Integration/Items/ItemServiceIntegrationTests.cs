namespace CSharpBackend.Tests.Integration.Items;

using CSharpBackend.Data;
using CSharpBackend.Models.DTOs;
using CSharpBackend.Models.Enums;
using CSharpBackend.Repositories;
using CSharpBackend.Services;
using Microsoft.EntityFrameworkCore;

[TestFixture]
public class ItemServiceIntegrationTests
{
    private ApplicationDbContext _context = null!;
    private IItemService _sut = null!;

    [SetUp]
    public void SetUp()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);
        var repository = new ItemRepository(_context);
        _sut = new ItemService(repository);
    }

    [TearDown]
    public void TearDown()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task CreateItemAsync_WhenCalledWithFakeItems_PersistsGeneratedItems()
    {
        var fakeItems = Enumerable.Range(1, 5).Select(CreateFakeItem).ToList();

        foreach (var fakeItem in fakeItems)
        {
            await _sut.CreateItemAsync(fakeItem);
        }

        var persistedItems = await _context.Items.OrderBy(item => item.Id).ToListAsync();

        Assert.Multiple(() =>
        {
            Assert.That(persistedItems, Has.Count.EqualTo(fakeItems.Count));
            Assert.That(persistedItems.Select(item => item.Name),
                Is.EquivalentTo(fakeItems.Select(item => item.Name)));
            Assert.That(persistedItems.Select(item => item.Quantity),
                Is.EquivalentTo(fakeItems.Select(item => item.Quantity)));
        });
    }

    [Test]
    public async Task GetAllItemsAsync_WhenFakeItemsExist_ReturnsAllItemsAsDtos()
    {
        var fakeItems = Enumerable.Range(1, 3).Select(CreateFakeItem).ToList();

        foreach (var fakeItem in fakeItems)
        {
            await _sut.CreateItemAsync(fakeItem);
        }

        var result = await _sut.GetAllItemsAsync();

        Assert.Multiple(() =>
        {
            Assert.That(result, Has.Count.EqualTo(fakeItems.Count));
            Assert.That(result.Select(item => item.Name),
                Is.EquivalentTo(fakeItems.Select(item => item.Name.Trim())));
            Assert.That(result.All(item => item.Id > 0), Is.True);
        });
    }

    [Test]
    public async Task DeleteItemAsync_WhenItemExists_RemovesItemAndReturnsTrue()
    {
        var fakeItem = CreateFakeItem(1);
        var createdItem = await _sut.CreateItemAsync(fakeItem);

        var wasDeleted = await _sut.DeleteItemAsync(createdItem.Id);
        var persistedItem = await _context.Items.FirstOrDefaultAsync(item => item.Id == createdItem.Id);

        Assert.Multiple(() =>
        {
            Assert.That(wasDeleted, Is.True);
            Assert.That(persistedItem, Is.Null);
        });
    }

    [Test]
    public async Task DeleteItemAsync_WhenItemDoesNotExist_ReturnsFalse()
    {
        var wasDeleted = await _sut.DeleteItemAsync(999_999);
        Assert.That(wasDeleted, Is.False);
    }

    private static CreateItemRequestDto CreateFakeItem(int index)
    {
        return new CreateItemRequestDto
        {
            Name = $"Fake Item {index} {Guid.NewGuid():N}",
            Type = (ItemType)(index % 3),
            Price = 5 + index,
            Quantity = index * 2,
            Description = $"Generated fake item {index}"
        };
    }
}
