using System.ComponentModel.DataAnnotations;

namespace EventBookingSystem.Models
{
    public class CreateBookingRequest
    {
        [Required]
        public Guid UserId { get; set; }  // Chỉ cần UserId
        [Required]
        public Guid EventId { get; set; } // Chỉ cần EventId
        [Required]
        public string PaymentStatus { get; set; }
    }
}
