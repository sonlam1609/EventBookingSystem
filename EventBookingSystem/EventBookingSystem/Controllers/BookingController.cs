using EventBookingSystem.Data.Repository;
using EventBookingSystem.Hubs;
using EventBookingSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace EventBookingSystem.Controllers
{
    // Controllers/BookingController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IHubContext<BookingHub> _hubContext;

        public BookingController(IBookingRepository bookingRepository, IHubContext<BookingHub> hubContext)
        {
            _bookingRepository = bookingRepository;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddBooking([FromBody] CreateBookingRequest request)
        {
            var booking = new Booking
            {
                UserId = request.UserId,
                EventId = request.EventId,
                BookingDate = DateTime.UtcNow,
                PaymentStatus = request.PaymentStatus // Ví dụ: "Pending", "Completed"
            };

            await _bookingRepository.AddBookingAsync(booking);
            await _hubContext.Clients.All.SendAsync("BookingSuccess", "A new booking has been made!");
            return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, booking);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(Guid id)
        {
            var booking = await _bookingRepository.GetBookingByIdAsync(id);
            if (booking == null)
                return NotFound();

            return Ok(booking);
        }
    }
}
