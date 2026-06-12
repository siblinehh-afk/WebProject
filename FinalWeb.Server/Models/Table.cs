using System.ComponentModel.DataAnnotations;

namespace FinalWeb.Server.Models
{
    public class Table
    {
        public int Id { get; set; }

        [Required]
        public int TableNumber { get; set; }

        [Required]
        public int Capacity { get; set; }

        [Required]
        [StringLength(50)]
        public string Location { get; set; }

        public bool IsAvailable { get; set; } = true;

        [StringLength(300)]
        public string? Description { get; set; }
    }
}