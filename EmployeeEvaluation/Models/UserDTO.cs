using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.Models
{
    public class UserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public Project? Project { get; set; }
    }
}
