using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;
        private readonly DepartmentService _departmentService;
        private readonly UserService _userService;

        public ProjectController(ProjectService projectService, DepartmentService departmentService, UserService userService)
        {
            this._projectService = projectService;
            this._departmentService = departmentService;
            this._userService = userService;
        }

        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return this._projectService.GetProjects();
        }

        [HttpGet("department/{depId}")]
        public IEnumerable<Project> GetProjectsOfDepartment(Guid depId)
        {
            return this._projectService.GetProjectsOfDepartment(depId);
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public Project Get(Guid id)
        {
            return this._projectService.GetProjectById(id);
        }

        // POST api/<ProjectController>
        [HttpPost]
        public Project Post([FromBody] ProjectDTO project)
        {
            var department = _departmentService.GetDepartmentById(project.DepartmentId);
            var projectToAdd = new Project
            {
                Name = project.Name,
                Description = project.Description,
                DepartmentId = project.DepartmentId,
                Department=department,
                TeamLeadId=project.TeamLeadId
            };
            return this._projectService.AddProject(projectToAdd);
        }
        [HttpPost("{proId}/add-users")]
        public Project AddUsersToProject(Guid proId,[FromBody] List<Guid> usersIds)
        {
            var users=new List<User>();
            foreach(var id in usersIds)
            {
                var userToAdd = _userService.GetUserById(id);
                users.Add(userToAdd);
            }
            return _projectService.AddUsersToProject(proId, users);
        }

        [HttpDelete("{proId}/{userId}")]
        public Project RemoveUserFromProject([FromRoute]  Guid proId, [FromRoute] Guid userId)
        {
            var userToRemove = new User();
            userToRemove = _userService.GetUserById(userId);
            return _projectService.RemoveUserFromProject(proId, userToRemove);
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public Project Put(Guid id, [FromBody] ProjectDTO project)
        {
            var projectToEdit = _projectService.GetProjectById(id);
            projectToEdit.Name = project.Name;
            projectToEdit.Description = project.Description;
            projectToEdit.ProjectManagerId = project.ProjectManagerId;
            projectToEdit.TeamLeadId = project.TeamLeadId;
            return this._projectService.UpdateProject(projectToEdit);
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            this._projectService.DeleteProject(id);
        }
    }
}
