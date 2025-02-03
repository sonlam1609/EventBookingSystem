using Microsoft.AspNetCore.SignalR;

namespace EventBookingSystem.Hubs
{
    public class BookingHub : Hub
    {
        public async Task NotifyBookingSuccess(string message)
        {
            await Clients.All.SendAsync("BookingSuccess", message);
        }
    }

}
