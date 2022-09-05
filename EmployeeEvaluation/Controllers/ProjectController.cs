using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            this._projectService=projectService;
        }

        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return this._projectService.GetProjects();
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public Project Get(Guid id)
        {
            return this._projectService.GetProjectById(id);
        }

        // POST api/<ProjectController>
        [HttpPost]
        public Project Post([FromBody] Project project)
        {
            return this._projectService.AddProject(project);
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public Project Put(int id, [FromBody] Project project)
        {
            return this._projectService.UpdateProject(project);
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            this._projectService.DeleteProject(id);
        }
    }
}
