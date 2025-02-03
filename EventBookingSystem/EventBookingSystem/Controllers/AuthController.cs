using EventBookingSystem.Models;
using EventBookingSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventBookingSystem.Controllers
{
    // Controllers/AuthController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var token = await _authService.Authenticate(model.Username, model.Password);

            if (token == null)
                return Unauthorized();

            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Trả về lỗi nếu dữ liệu không hợp lệ
            }

            var result = await _authService.Register(model);

            if (!result)
            {
                return Conflict("Username already exists"); // Trả về lỗi nếu username đã tồn tại
            }

            return Ok("User registered successfully"); // Trả về thông báo thành công
        }
    }
}
