using GamesStore_11883_API.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesStore_11883_API.Context
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> o) : base(o)
        {
            Database.EnsureCreated();
        }
        // Product Database
        public DbSet<Game> Games { get; set; }
        public DbSet<Author> Authors { get; set; }
    }
}
