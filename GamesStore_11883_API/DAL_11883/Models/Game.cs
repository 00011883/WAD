using System.ComponentModel.DataAnnotations;

namespace GamesStore_11883_API.Models
{
    public class Game
    {
        [Required, Range(1, int.MaxValue)]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required, Range(0, int.MaxValue)]
        public string PosterUrl { get; set; }
        [Required]
        public Author Author { get; set; }
    }
}
