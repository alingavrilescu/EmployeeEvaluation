using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.Extensions;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Identity;

namespace EmployeeEvaluation.AggregationServices
{
    public class UsersAggregationService
    {
        private readonly UserService usersService;
        private readonly UserManager<ApplicationUser> usersManager;
        private readonly RoleManager<IdentityRole> rolesManager;
        private readonly ILogger<UsersAggregationService> logger;
        public UsersAggregationService(UserService usersService,
                                        UserManager<ApplicationUser> usersManager,
                                        RoleManager<IdentityRole> rolesManager,
                                        ILogger<UsersAggregationService> logger)
        { 
            this.usersService = usersService;
            this.usersManager = usersManager;
            this.rolesManager = rolesManager;
            this.logger = logger;
        }
        private async Task<IEnumerable<UserDTO>> GetUsersWithIdentityData(IEnumerable<User> users)
        {
            List<UserDTO> usersDTOList = new();
            foreach (var user in users)
            {
                var identityUser = await usersManager.FindByIdAsync(user.Id.ToString());
                if (identityUser != null)
                {
                    usersDTOList.Add(user.ToUserDTO(identityUser));
                }
            }
            return usersDTOList;
        }

        public async Task<UserDTO> CreateUser(UserDTO newUser, string password)
        {
            
            var roleExists = await rolesManager.RoleExistsAsync(newUser.Role);
            if (!roleExists)
                throw new ArgumentException("The role specified for the user is invalid", "newUser");

            var identityUser = new ApplicationUser(newUser.Email);
            identityUser.Email = newUser.Email;
            identityUser.EmailConfirmed = true;
            var createUserResult = await usersManager.CreateAsync(identityUser, password);
            if (createUserResult != IdentityResult.Success)
            {
                logger.LogError("Failed to create identity user. {@Errors} ", createUserResult.Errors);
                throw new Exception("Failed to create new identity user");
            }
            await 
                usersManager.AddToRoleAsync(identityUser, newUser.Role);
            User user = new()
            {
                Id = Guid.Parse(identityUser.Id),
                ProjectId = newUser.ProjectId,
                DepartmentId = newUser.DepartmentId,
                Name = newUser.Name,
                Role = newUser.Role
            };            
            var savedUser = usersService.AddUser(user);
            return savedUser.ToUserDTO(identityUser);
        }
        public async Task DeleteUser(UserDTO newUser)
        {
            var userToDelete = new ApplicationUser(newUser.Email);
            userToDelete.Id = newUser.Id.ToString();
            await usersManager.DeleteAsync(userToDelete);
            usersService.DeleteUser(newUser.Id);
        }

        public async Task DeleteUserById(Guid id)
        {
            var userToDelete = await usersManager.FindByIdAsync(id.ToString());
            if (userToDelete != null)
                await usersManager.DeleteAsync(userToDelete);
            usersService.DeleteUser(id);
        }
        public async Task<IEnumerable<UserDTO>> GetAllUsers()
        {
            var users = usersService.GetUsers();
            return await GetUsersWithIdentityData(users);
        }
        public async Task<IEnumerable<UserDTO>> GetUsersByProject(Guid projectId)
        {
            var users = usersService.GetUsersOfProject(projectId);
            return await GetUsersWithIdentityData(users);
        }
        public async Task<IEnumerable<UserDTO>> GetUsersByDepartment(Guid departmentId)
        {
            var users = usersService.GetUsersOfDepartment(departmentId);
            return await GetUsersWithIdentityData(users);
        }
        public async Task<IEnumerable<UserDTO>> GetUsersWithNoDepartment()
        { 
            var users = usersService.GetUsersWithoutDepartment();
            return await GetUsersWithIdentityData(users);
        }

        public async Task<IEnumerable<UserDTO>> GetUsersWithNoProject(Guid deptId)
        {
            var users = usersService.GetUsersWithoutProject(deptId);
            return await GetUsersWithIdentityData(users);
        }
        public async Task<UserDTO> GetUserById(Guid id)
        { 
            var user = usersService.GetUserById(id);
            var identityUser = await usersManager.FindByIdAsync(id.ToString());
            if (identityUser == null)
                throw new KeyNotFoundException($"User cannot be found {id.ToString()}");

            return user.ToUserDTO(identityUser);
        }
    }
}
