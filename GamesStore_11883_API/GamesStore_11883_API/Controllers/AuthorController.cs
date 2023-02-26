using GamesStore_11883_API.Models;
using GamesStore_11883_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;

namespace GamesStore_11883_API.Controllers
{
    [Route("api/Author")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;
        public AuthorController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }
        // GET: api/Author
        [HttpGet]
        public IActionResult Get()
        {
            var author = _authorRepository.GetAuthor();
            return new OkObjectResult(author);
        }
        // GET: api/Author/5
        [HttpGet("{id}", Name = "GetA")]
        public IActionResult Get(int id)
        {
            var author = _authorRepository.GetAuthorById(id);
            return new OkObjectResult(author);
        }
        // POST: api/Author
        [HttpPost]
        public IActionResult Post([FromBody] Author author)
        {
            using (var scope = new TransactionScope())
            {
                _authorRepository.InsertAuthor(author);
                scope.Complete();
                return CreatedAtAction(nameof(Get), new { id = author.ID }, author);
            }
        }
        // PUT: api/Author/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Author author)
        {
            if (author != null)
            {
                using (var scope = new TransactionScope())
                {
                    _authorRepository.UpdateAuthor(author);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _authorRepository.DeleteAuthor(id);
            return new OkResult();
        }
    }
}
