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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Password = "A3TXZ+xzX61bICKFP4faxCh9lg6MYS0sAcOLHy+4RlI=",
                    Email = "borgoth@mordos.com"
                }
            );
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
