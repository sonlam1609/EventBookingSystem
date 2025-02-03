using EventBookingSystem.Models;

namespace EventBookingSystem.Data.Repository
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(Guid id);
        Task AddEventAsync(Event request);
        Task UpdateEventAsync(Event request);
        Task DeleteEventAsync(Guid id);
    }
}
