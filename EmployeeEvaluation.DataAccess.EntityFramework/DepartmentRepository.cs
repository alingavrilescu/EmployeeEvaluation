using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class DepartmentRepository
    {
        protected readonly EmployeeEvaluationDbContext dbContext;

        public DepartmentRepository(EmployeeEvaluationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public IEnumerable<Department> GetAll()
        {
            return dbContext.Set<Department>().Include(u => u.Users)
                                              .Include(p =>p.Projects)
                                              .Include(t => t.FormTemplates).ToList();
        }
        public Department GetById(Guid id)
        {
            var departmentToReturn = dbContext.Set<Department>().Where(d => d.Id == id)
                                                                .Include(u => u.Users)
                                                                .Include(p => p.Projects)
                                                                .Include(t => t.FormTemplates).FirstOrDefault();
            if (departmentToReturn == null)
            {
                throw new KeyNotFoundException("User not found");
            }
            return departmentToReturn;
        }
        public Department Add(Department toAdd)
        {
            var department = dbContext.Set<Department>().Add(toAdd);
            dbContext.SaveChanges();
            return department.Entity;
        }
        public Department Update(Department toUpdate)
        {
            this.dbContext.Set<Department>().Update(toUpdate);
            this.dbContext.SaveChanges();
            return toUpdate;
        }

        public void DeleteById(Guid id)
        {
            var toDelete = GetById(id);
            dbContext.Set<Department>().Remove(toDelete);
            dbContext.SaveChanges();
        }
    }
}
