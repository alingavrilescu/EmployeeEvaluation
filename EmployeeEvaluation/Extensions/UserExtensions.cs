using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.Models;

namespace EmployeeEvaluation.Extensions
{
    public static class UserExtensions
    {
        public static UserDTO ToUserDTO(this User user, ApplicationUser identityUser)
        {
            return new UserDTO
            {
                Id = user.Id,
                DepartmentId = user.DepartmentId,
                Email = identityUser.Email,
                Name = user.Name,
                ProjectId = user.ProjectId,
                Role = user.Role
            };
        }
    }
}
