using GamesStore_11883_API.Context;
using GamesStore_11883_API.Models;
using System.Collections.Generic;
using System.Linq;

namespace GamesStore_11883_API.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly GameContext _dbContext;
        public AuthorRepository(GameContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void DeleteAuthor(int authorid)
        {
            var category = _dbContext.Authors.Find(authorid);
            _dbContext.Authors.Remove(category);
            Save();
        }
        public Author GetAuthorById(int Id)
        {
            var cate = _dbContext.Authors.Find(Id);
            return cate;
        }
        public IEnumerable<Author> GetAuthor()
        {
            return _dbContext.Authors.ToList();
        }
        public void InsertAuthor(Author author)
        {
            _dbContext.Add(author);
            Save();
        }
        public void UpdateAuthor(Author author)
        {
            _dbContext.Entry(author).State =
           Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
        // DRY Principle
        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
