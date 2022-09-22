using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.ApplicationLogic;
using Microsoft.AspNetCore.Mvc;
using EmployeeEvaluation.Models;

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : Controller
    {
        private readonly DepartmentService departmentService;
        private readonly UserService userService;
        public DepartmentController(DepartmentService departmentService, UserService userService)
        {
            this.departmentService = departmentService;
            this.userService = userService;
        }
        [HttpGet]
        public IEnumerable<Department> Get()
        {
            return this.departmentService.GetAllDepartments();
        }
        [HttpGet("{id}")]
        public Department GetDepartmentById(Guid id)
        {
            return this.departmentService.GetDepartmentById(id);
        }
        [HttpPost]
        public Department Post([FromBody] DepartmentDTO department)
        {
            var departmentToAdd = new Department
            {
                Name = department.Name,
                HeadOfDepartmentId = department.HeadOfDepartmentId
            };
            return this.departmentService.AddDepartment(departmentToAdd);
        }
        [HttpPost("{depId}/add-users")]
        public Department AddUsersInDepartment(Guid depId,[FromBody] List<Guid>usersIds)
        {
            var users = new List<User>();
            foreach (var id in usersIds)
            {
                var userToAdd = userService.GetUserById(id);
                users.Add(userToAdd);
            }
            return this.departmentService.AddUsersToDepartment(depId, users);
        }
        [HttpPost("{depId}/add-form-templates")]

        public Department AddFormTemplateInDepartment(Guid depId, [FromBody] FormTemplate formTemplate)
        {
            var formTemplateToAdd = new FormTemplate
            {
                Name = formTemplate.Name,
                Type = formTemplate.Type,
                DepartmentId = depId
            };
            return this.departmentService.AddFormTemplateToDepartment(depId, formTemplateToAdd);
        }

        [HttpPut("{id}")]
        public Department Put(Guid id, [FromBody] Department department)
        {
            var departmentToEdit = new Department
            {
                Name = department.Name,
                HeadOfDepartmentId = department.HeadOfDepartmentId
            };
            return this.departmentService.UpdateDepartment(departmentToEdit);
        }
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            this.departmentService.DeleteDepartment(id);
        }
    }
}
