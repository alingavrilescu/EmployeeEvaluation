using EmployeeEvaluation.DataAccess.EntityFramework;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class DepartmentService
    {
        private readonly DepartmentRepository departmentRepository;
        DepartmentService(DepartmentRepository departmentRepository)
        {
            this.departmentRepository = departmentRepository;
        }
        public Department GetDepartmentById(Guid id)
        {
            return this.departmentRepository.GetById(id);
        }

        public IEnumerable<Department> GetAllDepartments()
        {
            return this.departmentRepository.GetAll();
        }

        public Department AddDepartment(Department toAdd)
        {
            return departmentRepository.Add(toAdd);
        }
        public Department UpdateDepartment(Department department)
        {
            return departmentRepository.Update(department);
        }

        public void DeleteDepartment(Guid id)
        {
            this.departmentRepository.DeleteById(id);
        }
    }
}
