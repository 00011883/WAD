using GamesStore_11883_API.Context;
using GamesStore_11883_API.Models;
using System.Collections.Generic;
using System.Linq;

namespace GamesStore_11883_API.Repository
{
    public class GameRepository : IGameRepository
    {
        private readonly GameContext _dbContext;
        public GameRepository(GameContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void DeleteGame(int gameId)
        {
            var game = _dbContext.Games.Find(gameId);
            _dbContext.Games.Remove(game);
            Save();
        }
        public Game GetGameById(int gameId)
        {
            var prod = _dbContext.Games.Find(gameId);
            //_dbContext.Entry(prod).Reference(s => s.Author).Load();
            return prod;
        }
        public IEnumerable<Game> GetGames()
        {
            return _dbContext.Games.ToList();
            //.Include(s => s.Author).ToList();
        }
        public void InsertGame(Game game)
        {
            game.Author =
           _dbContext.Authors.Find(game.Author.ID);
            _dbContext.Add(game);
            Save();
        }
        public void UpdateGame(Game game)
        {
            _dbContext.Entry(game).State =
           Microsoft.EntityFrameworkCore.EntityState.Modified;
            Save();
        }
        // DRY Principle
        public void Save()
        {
            _dbContext.SaveChanges();
        }

    }
}
