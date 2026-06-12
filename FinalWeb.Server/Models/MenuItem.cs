using System.ComponentModel.DataAnnotations;

namespace FinalWeb.Server.Models
{
    public class MenuItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Category { get; set; }

        [Required]
        public decimal Price { get; set; }

        [StringLength(300)]
        public string? Description { get; set; }

        public bool IsAvailable { get; set; } = true;

        [StringLength(300)]
        public string? ImagePath { get; set; }
    }
}