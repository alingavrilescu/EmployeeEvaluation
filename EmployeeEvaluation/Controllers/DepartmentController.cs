using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.ApplicationLogic;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeeEvaluation.Models;

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : Controller
    {
        private readonly DepartmentService departmentService;
        DepartmentController(DepartmentService departmentService)
        {
            this.departmentService = departmentService;
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
