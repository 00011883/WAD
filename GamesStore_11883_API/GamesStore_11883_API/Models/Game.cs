namespace GamesStore_11883_API.Models
{
    public class Game
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public Author Author { get; set; }
    }
}
