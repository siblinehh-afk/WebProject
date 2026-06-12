using System.ComponentModel.DataAnnotations;

namespace FinalWeb.Server.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public int TableId { get; set; }
        public Table? Table { get; set; }

        [Required]
        public DateTime ReservationDate { get; set; }

        [Required]
        [StringLength(50)]
        public string TimeSlot { get; set; }

        [Required]
        public int GuestCount { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; }
    }
}