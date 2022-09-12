using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.Models
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public Guid? ProjectId { get; set; }
        public Guid? DepartmentId { get; set; }
    }
}
