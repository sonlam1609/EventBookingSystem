using EventBookingSystem.Data.Repository;
using EventBookingSystem.Data;
using EventBookingSystem.Extensions;
using EventBookingSystem.Hubs;
using EventBookingSystem.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Your React frontend URL
              .AllowAnyMethod()                   // Allow any HTTP method (GET, POST, etc.)
              .AllowAnyHeader()                   // Allow any header
              .AllowCredentials();                // Allow credentials (cookies, authorization headers)
    });
});

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Redis
builder.Services.ConfigureRedis(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHub<BookingHub>("/bookingHub");

app.Run();
