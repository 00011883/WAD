using GamesStore_11883_API.Models;
using GamesStore_11883_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;

namespace GamesStore_11883_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        // GET: api/Game
        [HttpGet]
        public IActionResult Get()
        {
            var games = _gameRepository.GetGames();
            return new OkObjectResult(games);
        }
        // GET: api/Game/5
        [HttpGet, Route("{id}")]
        public IActionResult Get(int id)
        {
            var game = _gameRepository.GetGameById(id);
            return new OkObjectResult(game);
        }
        // POST: api/Game
        [HttpPost]
        public IActionResult Post([FromBody] Game game)
        {
            using (var scope = new TransactionScope())
            {
                _gameRepository.InsertGame(game);
                scope.Complete();
                return CreatedAtAction(nameof(Get), new { id = game.ID }, game);
            }
        }
        // PUT: api/Game/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Game game)
        {
            if (game != null)
            {
                using (var scope = new TransactionScope())
                {
                    _gameRepository.UpdateGame(game);
                    scope.Complete();
                    return new OkObjectResult(new { message = "Successfuly Updated", status = 202 });
                }
            }
            return new NoContentResult();
        }
        // DELETE: api/Game/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _gameRepository.DeleteGame(id);
            return new OkObjectResult( new { message="Successfuly Deteled", status = 204 });
        }
    }
}
