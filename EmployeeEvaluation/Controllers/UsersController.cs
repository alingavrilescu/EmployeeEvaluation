using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Swashbuckle.AspNetCore.Annotations;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.AggregationServices;

//test
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {      
        private readonly UsersAggregationService aggregationService;
        
        public UsersController(UsersAggregationService aggregationService)
        {           
            this.aggregationService = aggregationService;
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
       

        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Action was successful")]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Server error ocurred and is logged")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> GetAllUsers()
        {          
            try
            {
                var users = await aggregationService.GetAllUsers();
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
           
        }

        [HttpGet("department/{depId}")]
        public async Task<IActionResult> GetUsersOfDepartment(Guid depId)
        {
            try
            {
                var users = await aggregationService.GetUsersByDepartment(depId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Could not load the users from the database");
            }            
        }

        [HttpGet("project/{proId}")]
        public async Task<IActionResult> GetUsersOfProject(Guid proId)
        {
            try
            {
                var users = await aggregationService.GetUsersByProject(proId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Could not load the users from the database");
            }
        }

        [HttpGet("without-department")]
        public async Task<IActionResult> GetUsersWithoutDepartment()
        {
            try
            {
                var users = await aggregationService.GetUsersWithNoDepartment();
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }

        [HttpGet("without-project/department/{depId}")]
        public async Task<IActionResult> GetUsersWithoutProject(Guid depId)
        {
            try
            {
                var users = await aggregationService.GetUsersWithNoProject(depId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }

        [HttpGet("department/{depId}/developers")]
        public async Task<IActionResult> GetDevs(Guid depId)
        {
            try
            {
                var users = await aggregationService.GetDevs(depId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }

        [HttpGet("department/{depId}/project-managers")]
        public async Task<IActionResult> GetProjectManagers(Guid depId)
        {
            try
            {
                var users = await aggregationService.GetProjectManagers(depId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }

        [HttpGet("department/{depId}/team-leads")]
        public async Task<IActionResult> GetTeamLeads(Guid depId)
        {
            try
            {
                var users = await aggregationService.GetTeamLeads(depId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }
        [HttpGet("department/{depId}/project-managers/without-project")]
        public async Task<IActionResult> GetProjectManagersWithoutProject(Guid depId)
        {
            try
            {
                var users = await aggregationService.GetProjectManagersWithoutProject(depId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }

        [HttpGet("department/{depId}/team-leads/without-project")]
        public async Task<IActionResult> GetTeamLeadsWithoutProject(Guid depId)
        {
            try
            {
                var users = await aggregationService.GetTeamLeadsWithoutProject(depId);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }
        [HttpGet("head-of-dep")]
        public async Task<IActionResult> GetHODepsWithoutDep()
        {
            try
            {
                var users = await aggregationService.GetHODepsWithoutDep();
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Unable to retrieve users associated data");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            try
            {
                var users = await aggregationService.GetUserById(id);
                return Ok(users);
            }
            catch (Exception)
            {
                return Problem("Could not load the user from the database");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserDTO newUser)
        {
            try
            {
                var user = await aggregationService.CreateUser(new UserDTO()
                {
                    Email = newUser.Email,
                    Name = newUser.Name,
                    Role = newUser.Role,
                    DepartmentId = null,
                    ProjectId = null

                }, "P@ssw0rd");
                return Ok(user);
            }
            catch (Exception)
            {
                return Problem("Could not create the user");
            }           
            
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                await aggregationService.DeleteUserById(id);
                return Ok();
            }
            catch (Exception)
            {
                return Problem("Cannot remove the specified user");
            }
            
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(Guid id, [FromBody]UserDTO userData)
        {
            try
            {
                var user = await aggregationService.UpdateUser(userData);
                return Ok(user);
            }
            catch (Exception)
            {
                return Problem("Could not create the user");
            }
        }
    }
}
