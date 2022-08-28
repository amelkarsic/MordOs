using Microsoft.AspNetCore.Mvc;
using MordOs.Services;

namespace MordOs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(CancellationToken cancellationToken)
        {
            try
            {

                var result = await _authService.Login(Request.Headers["Authorization"], cancellationToken);

                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody]UserDto userDto,CancellationToken cancellationToken)
        {
            try
            {
                await _authService.CreateUser(userDto, cancellationToken);

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
