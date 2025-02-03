using EventBookingSystem.Data;
using EventBookingSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EventBookingSystem.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> Authenticate(string username, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);

            if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> Register(RegisterModel model)
        {
            // Kiểm tra xem username đã tồn tại chưa
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Username == model.Username);
            if (existingUser != null)
            {
                return false; // Username đã tồn tại
            }

            // Mã hóa mật khẩu
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // Tạo user mới
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = model.Username,
                PasswordHash = passwordHash
            };

            // Lưu user vào database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return true; // Đăng ký thành công
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            // Implement password hash verification logic here
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }

    }
}
