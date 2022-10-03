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
        private readonly ProjectService projectService;
        private readonly FormTemplateService formTemplateService;
        public DepartmentController(DepartmentService departmentService, UserService userService, ProjectService projectService, FormTemplateService formTemplateService)
        {
            this.departmentService = departmentService;
            this.userService = userService;
            this.projectService = projectService;
            this.formTemplateService = formTemplateService;
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

        [HttpGet("{depId}/statistics")]
        public DepartmentStatisticsDTO GetStatisticsForDep(Guid depId)
        {
            var departmentStatistics = new DepartmentStatisticsDTO
            {
                DevCount = this.userService.GetDevs(depId).Count(),
                PMCount = this.userService.GetProjectManagers(depId).Count(),
                TLCount = this.userService.GetTeamLeads(depId).Count(),
                MembersCount = this.userService.GetUsersOfDepartment(depId).Count(),
                ProjectsCounts = this.projectService.GetProjectsOfDepartment(depId).Count(),
                FormTemplatesCount = this.formTemplateService.GetFormTemplatesOfDepartment(depId).Count()
            };
            return departmentStatistics;
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

        [HttpDelete("{depId}/{userId}")]
        public Department RemoveUserFromDepartment([FromRoute]Guid depId, [FromRoute] Guid userId)
        {
            var userToRemove = new User();
            userToRemove = userService.GetUserById(userId);
            if (userToRemove.ProjectId != null)
            {
              projectService.RemoveUserFromProject(userToRemove.ProjectId.Value, userToRemove);
            }
            return departmentService.RemoveUserFromDepartment(depId, userToRemove);
        }

        [HttpPut("{id}")]
        public Department Put(Guid id, [FromBody] Department department)
        {
            var departmentToEdit = this.departmentService.GetDepartmentById(id);
            departmentToEdit.Name = department.Name;
            departmentToEdit.HeadOfDepartmentId = department.HeadOfDepartmentId;
            return this.departmentService.UpdateDepartment(departmentToEdit);
        }
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            this.departmentService.DeleteDepartment(id);
        }
    }
}
