using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GamesStore_11883_API.Models
{
    public class Author
    {
        [Required, Range(1, int.MaxValue)] // Required indicated to populate by ID game author population
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PosterUrl { get; set; }
    }
}
