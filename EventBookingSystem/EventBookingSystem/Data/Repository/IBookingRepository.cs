using EventBookingSystem.Models;

namespace EventBookingSystem.Data.Repository
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<Booking> GetBookingByIdAsync(Guid id);
        Task AddBookingAsync(Booking booking);
        Task UpdateBookingAsync(Booking booking);
        Task DeleteBookingAsync(Guid id);
    }
}
