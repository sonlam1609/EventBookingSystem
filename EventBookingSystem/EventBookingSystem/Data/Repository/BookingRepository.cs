using EventBookingSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EventBookingSystem.Data.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings.Include(b => b.Event).Include(b => b.User).ToListAsync();
        }

        public async Task<Booking> GetBookingByIdAsync(Guid id)
        {
            return await _context.Bookings.Include(b => b.Event).Include(b => b.User).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task AddBookingAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookingAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookingAsync(Guid id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }

    }
}
