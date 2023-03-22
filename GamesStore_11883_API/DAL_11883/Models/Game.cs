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
        public string ShortDescription { get; set; }
        [Required, Range(0, int.MaxValue)]
        public decimal Price { get; set; }
        [Required]
        public string PosterUrl { get; set; }
        [Required]
        public string ImgUrl { get; set; }
        [Required]
        public string Logo { get; set; }
        [Required]
        public Author Author { get; set; }
    }
}