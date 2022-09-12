using EmployeeEvaluation.ViewModels;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Swashbuckle.AspNetCore.Annotations;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.ApplicationLogic;

//test
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
        private readonly UserService _userService;
        public IList<AuthenticationScheme> ExternalLogins { get; set; }
        public UsersController(UserService userService, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IUserStore<ApplicationUser> userStore)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._userStore = userStore;
            this._emailStore = GetEmailStore();
            this._userService = userService;
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

        private List<UserDTO> createUsersDTO(List<ApplicationUser> identityUsers, List<User> users)
        {
            List<UserDTO> usersDTO = new List<UserDTO>();
            for (int i = 0; i < identityUsers.Count; i++)
            {
                var newUser = new UserDTO();
                newUser.Id = new Guid(identityUsers[i].Id);
                newUser.Name = identityUsers[i].UserName;
                newUser.Email = identityUsers[i].Email;
                newUser.Role = users[i].Role;
                newUser.DepartmentId = users[i].DepartmentId;
                newUser.ProjectId = users[i].ProjectId;
                usersDTO.Add(newUser);
            }
            return usersDTO;
        }
        private UserDTO createUserDTO(ApplicationUser identityUser, User user)
        {
            var newUser = new UserDTO();
            newUser.Id = new Guid(identityUser.Id);
            newUser.Name = identityUser.UserName;
            newUser.Email = identityUser.Email;
            newUser.Role = user.Role;
            newUser.DepartmentId = user.DepartmentId;
            newUser.ProjectId = user.ProjectId;
            return newUser;
        }

        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Action was successful")]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Server error ocurred and is logged")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> GetAllUsers()
        {
            var identityUsers = await _userManager.Users.ToListAsync();
            var users = _userService.GetUsers();
            return Ok(createUsersDTO(identityUsers, (List<User>)users));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var identityUser = await _userManager.FindByIdAsync(id.ToString());
            var user = _userService.GetUserById(id);
            return Ok(this.createUserDTO(identityUser, user));
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserPostDTO newUser)
        {
            var identityUser = CreateUser();
            await _userStore.SetUserNameAsync(identityUser, newUser.Name, CancellationToken.None);
            await _emailStore.SetEmailAsync(identityUser, newUser.Email, CancellationToken.None);
            var result = await _userManager.CreateAsync(identityUser, "P@ssw0rd!");
            if (result == IdentityResult.Success)
            {
                var userToAdd = new User();
                userToAdd.Id = new Guid(identityUser.Id);
                userToAdd.Role = newUser.Role;
                this._userService.AddUser(userToAdd);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var identityUser = await _userManager.FindByIdAsync(id.ToString());
            var user = _userService.GetUserById(id);
            if (identityUser == null || user == null) return BadRequest();
            var result = await _userManager.DeleteAsync(identityUser);
            if (!result.Succeeded) return BadRequest();
            this._userService.DeleteUser(id);
            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid id, [FromBody]UserDTO DTOuser)
        {
            var identityUser = await _userManager.FindByIdAsync(id.ToString());
            var user = _userService.GetUserById(id);
            if (identityUser == null || user == null) return BadRequest();
            identityUser.UserName = DTOuser.Name;
            identityUser.Email = DTOuser.Email;
            await _userManager.UpdateAsync(identityUser);
            user.Role = DTOuser.Role;
            user.DepartmentId = DTOuser.DepartmentId;
            user.ProjectId = DTOuser.ProjectId;
            this._userService.EditUser(user);
            return Ok();
        }
    }
}
