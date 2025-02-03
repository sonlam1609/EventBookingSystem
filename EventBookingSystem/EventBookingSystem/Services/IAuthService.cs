using EventBookingSystem.Models;

namespace EventBookingSystem.Services
{
    public interface IAuthService
    {
        Task<string> Authenticate(string username, string password);
        Task<bool> Register(RegisterModel model);
    }
}
