using Microsoft.EntityFrameworkCore;
using MordOs.Infrastucture.Entities;

namespace MordOs.Infrastucture
{
    public interface IMordDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Document> Documents { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }

    public class MordDbContext : DbContext, IMordDbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Document> Documents { get; set; }

        public MordDbContext(DbContextOptions<MordDbContext> options) : base(options)
        {
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
