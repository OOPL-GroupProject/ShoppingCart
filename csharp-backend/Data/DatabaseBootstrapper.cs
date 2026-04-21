namespace CSharpBackend.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public static class DatabaseBootstrapper
{
    public static async Task EnsureItemSchemaAsync(ApplicationDbContext context, ILogger logger)
    {
        if (!context.Database.IsSqlServer())
        {
            return;
        }

        const string sql = @"
IF OBJECT_ID(N'[dbo].[Item]', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH('dbo.Item', 'Id') IS NULL
    BEGIN
        ALTER TABLE [dbo].[Item] ADD [Id] INT IDENTITY(1,1) NOT NULL;
    END;

    IF COL_LENGTH('dbo.Item', 'Id') IS NOT NULL
       AND NOT EXISTS (
            SELECT 1
            FROM sys.key_constraints kc
            INNER JOIN sys.tables t ON kc.parent_object_id = t.object_id
            WHERE kc.[type] = 'PK'
              AND t.[name] = 'Item'
              AND SCHEMA_NAME(t.schema_id) = 'dbo'
       )
    BEGIN
        ALTER TABLE [dbo].[Item] ADD CONSTRAINT [PK_Item] PRIMARY KEY ([Id]);
    END;
END;
";

        try
        {
            await context.Database.ExecuteSqlRawAsync(sql);
        }
        catch (Exception exception)
        {
            logger.LogWarning(exception, "Unable to auto-ensure Item schema. Run DB migration SQL manually.");
        }
    }
}
