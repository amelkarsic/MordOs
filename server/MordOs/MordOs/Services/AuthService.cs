using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using MordOs.Infrastucture;
using MordOs.Infrastucture.Entities;
using System.Net.Http.Headers;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace MordOs.Services
{
    public class UserDto
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public interface IAuthService
    {
        Task<string> Login(string authHeader, CancellationToken cancellation);
        Task CreateUser(UserDto user, CancellationToken cancellation);
    }

    public class AuthService : IAuthService
    {
        private readonly IMordDbContext _mordDbContext;
        private readonly static byte[] SALT = new byte[] { 8, 4, 6, 3, 4, 2, 5, 7, 1, 2, 3, 6, 8, 1, 0, 6 };

        public AuthService(IMordDbContext mordDbContext)
        {
            _mordDbContext = mordDbContext;
        }

        public async Task<string> Login(string authHeader, CancellationToken cancellation)
        {
            if (string.IsNullOrWhiteSpace(authHeader))
            {
                throw new ArgumentNullException(nameof(authHeader));
            }

            if (!AuthenticationHeaderValue.TryParse(authHeader, out AuthenticationHeaderValue header))
            {
                throw new Exception("Invalid header");
            }

            var credentialBytes = Convert.FromBase64String(header.Parameter);
            var credentials = Encoding.UTF8.GetString(credentialBytes).Split(':');
            string email = credentials[0].ToLower().Trim();
            string password = credentials[1];

            var user = await _mordDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user != null && user.Password == HashPassword(password))
            {
                return "authorized";
            } 

            throw new UnauthorizedAccessException("Unauthorized");
        }

        public static string HashPassword(string val)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
              password: val,
              salt: SALT,
              prf: KeyDerivationPrf.HMACSHA512,
              iterationCount: 10000,
              numBytesRequested: 256 / 8));

            return hashed;
        }

        public async Task CreateUser(UserDto user, CancellationToken cancellation)
        {
            var newUser = _mordDbContext.Users.Add(new User { 
                 Email = user.Email,
                 Password = HashPassword(user.Password),
            });

            await _mordDbContext.SaveChangesAsync();
        }
    }
}
