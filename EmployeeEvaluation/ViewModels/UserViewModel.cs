using System.ComponentModel.DataAnnotations;

namespace EmployeeEvaluation.ViewModels
{
    public class UserViewModel
    {
        [Key]
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}