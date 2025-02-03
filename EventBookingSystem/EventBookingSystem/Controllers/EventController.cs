using EventBookingSystem.Data.Repository;
using EventBookingSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventBookingSystem.Controllers
{
    // Controllers/EventController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _eventRepository.GetAllEventsAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(Guid id)
        {
            var currentEvent = await _eventRepository.GetEventByIdAsync(id);
            if (currentEvent == null)
                return NotFound();

            return Ok(currentEvent);
        }

        [HttpPost]
        public async Task<IActionResult> AddEvent([FromBody] Event request)
        {
            await _eventRepository.AddEventAsync(request);
            return CreatedAtAction(nameof(GetEventById), new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(Guid id, [FromBody] Event request)
        {
            if (id != request.Id)
                return BadRequest();

            await _eventRepository.UpdateEventAsync(request);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            await _eventRepository.DeleteEventAsync(id);
            return NoContent();
        }
    }
}
