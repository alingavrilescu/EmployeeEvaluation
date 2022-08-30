using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserStore<ApplicationUser> _userStore;
        private readonly IUserEmailStore<ApplicationUser> _emailStore;
        public IList<AuthenticationScheme> ExternalLogins { get; set; }
        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IUserStore<ApplicationUser> userStore)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._userStore = userStore;
            this._emailStore = GetEmailStore();
        }

        private ApplicationUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<ApplicationUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(ApplicationUser)}'. " +
                    $"Ensure that '{nameof(ApplicationUser)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        private IUserEmailStore<ApplicationUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<ApplicationUser>)_userStore;
        }


        // GET: api/<UsersController>
        //[HttpGet]
        //public async Task Get()
        //{
        //    ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        //}
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
            /// MESAJ
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string value)
        {
            var user = CreateUser();
            await _userStore.SetUserNameAsync(user, "hr2@gmail.com", CancellationToken.None);
            await _emailStore.SetEmailAsync(user, "hr2@gmail.com", CancellationToken.None);
            var result = await _userManager.CreateAsync(user, "HRRR123");

            if (result != IdentityResult.Success)
            {
                return BadRequest();
            }
            else
            {
                return Ok();
            }
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
