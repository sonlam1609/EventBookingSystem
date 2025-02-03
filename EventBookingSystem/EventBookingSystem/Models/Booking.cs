namespace EventBookingSystem.Models
{
    public class Booking
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public DateTime BookingDate { get; set; }
        public string PaymentStatus { get; set; }
        public virtual Event Event { get; set; }
        public virtual User User { get; set; }
    }
}
