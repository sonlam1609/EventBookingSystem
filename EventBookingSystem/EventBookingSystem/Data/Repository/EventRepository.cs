using EventBookingSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EventBookingSystem.Data.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext _context;

        public EventRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<Event> GetEventByIdAsync(Guid id)
        {
            return await _context.Events.FindAsync(id);
        }

        public async Task AddEventAsync(Event request)
        {
            _context.Events.Add(request);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEventAsync(Event request)
        {
            _context.Events.Update(request);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEventAsync(Guid id)
        {
            var currentEvent = await _context.Events.FindAsync(id);
            if (currentEvent != null)
            {
                _context.Events.Remove(currentEvent);
                await _context.SaveChangesAsync();
            }
        }
    }
}
