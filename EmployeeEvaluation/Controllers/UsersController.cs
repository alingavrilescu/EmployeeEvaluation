using EmployeeEvaluation.ViewModels;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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


        // DELETE api/<UsersController>/5
        [HttpDelete("DeleteUser{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                ModelState.AddModelError("", "User Not Found");
                return BadRequest();
            }
        }


        /*[HttpPut]
        public async Task<IActionResult> Update(Guid id, [FromBody] UserViewModel user)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                if (!string.IsNullOrEmpty(email))
                    user.Email = email;
                else
                    ModelState.AddModelError("", "Email cannot be empty");
            }
            else
                ModelState.AddModelError("", "User Not Found");
            return Ok();
        }
        */
        [HttpPut]
        public async Task<IActionResult> Update(string id, string email, string name)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                if (!string.IsNullOrEmpty(email))
                {
                    user.Email = email;
                }
                else
                {
                    ModelState.AddModelError("", "Email cannot be empty");
                }

                if (!string.IsNullOrEmpty(name))
                {
                    user.UserName = name;
                }
                else
                {
                    ModelState.AddModelError("", "UserName cannot be empty");
                }

                if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(name))
                {
                    IdentityResult result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return RedirectToAction("Index");
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }
            else
            {

                return BadRequest();
            }
        }

    }
}
