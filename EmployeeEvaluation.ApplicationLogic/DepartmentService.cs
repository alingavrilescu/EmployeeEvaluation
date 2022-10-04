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
        public DepartmentService(DepartmentRepository departmentRepository)
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
        public Department AddUserToDepartment(Guid depId, User user)
        {
            return departmentRepository.AddUserToDepartment(depId, user);
        }
        public Department UpdateDepartment(Department department)
        {
            return departmentRepository.Update(department);
        }

        public Department AddUsersToDepartment(Guid depId, List<User> users)
        {
            return departmentRepository.AddUsersToDepartment(depId, users);
        }

        public Department RemoveUserFromDepartment(Guid depId, User user)
        {
            return this.departmentRepository.RemoveUserFromDepartment(depId, user);
        }

        public void DeleteDepartment(Guid id)
        {
            this.departmentRepository.DeleteById(id);
        }
    }
}
