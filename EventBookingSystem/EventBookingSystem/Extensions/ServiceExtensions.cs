namespace EventBookingSystem.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureRedis(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = configuration.GetConnectionString("Redis");
            });
        }
    }
}
