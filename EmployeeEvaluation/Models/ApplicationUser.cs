using EmployeeEvaluation.DataAccess.Model;
using Microsoft.AspNetCore.Identity;

namespace EmployeeEvaluation.Models
{
    public class ApplicationUser
    {
        ApplicationUser IdentityUser {get;set;}
        Project Project { get; set; }

    }
}