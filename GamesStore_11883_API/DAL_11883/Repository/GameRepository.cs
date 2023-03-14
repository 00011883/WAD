using GamesStore_11883_API.DAL_11883;
using GamesStore_11883_API.Models;
using Microsoft.EntityFrameworkCore;
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
            var game = FindOne(gameId);
            _dbContext.Games.Remove(game);
            Save();
        }
        public Game GetGameById(int gameId)
        {
            var prod = FindOne(gameId);
            // To show from request author of the game just enable the next line
            //_dbContext.Entry(prod).Reference(s => s.Author).Load();
            return prod;
        }
        public IEnumerable<Game> GetGames()
        {
            return _dbContext.Games.ToList();
            // to return entire game with detailed author use the following instead above one
            // return _dbContext.Games.Include(s => s.Author).ToList();
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
            _dbContext.Entry(game).State = EntityState.Modified;
            Save();
        }
        // DRY Principle
        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public Game FindOne(int id)
        {
            return _dbContext.Games.Find(id);
        }
    }
}
