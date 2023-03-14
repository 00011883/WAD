using System.ComponentModel.DataAnnotations;

namespace GamesStore_11883_API.Models
{
    public class Author
    {
        [Required, Range(1, int.MaxValue)]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string PosterUrl { get; set; }
    }
}
