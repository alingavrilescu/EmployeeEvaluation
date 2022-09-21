using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;


namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class UserRepository : IUserRepository
    {
        public readonly EmployeeEvaluationDbContext dbContext;
        public UserRepository(EmployeeEvaluationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
         public User Add(User toAdd)
        {
            var user = dbContext.Set<User>().Add(toAdd);
            dbContext.SaveChanges();
            return user.Entity;
        }
        public IEnumerable<User> GetAll()
        {
            return dbContext.Set<User>().Include(p=>p.Project).Include(ef=>ef.EvaluationForms).ToList();
        }
        public User GetById(Guid id)
        {
            var userToReturn = dbContext.Set<User>().Where(u => u.Id == id).Include(p => p.Project).Include(ef => ef.EvaluationForms).FirstOrDefault();
            if (userToReturn == null)
            {
                throw new KeyNotFoundException("User not found");
            }
            return userToReturn;
        }

        public IEnumerable<User> GetUsersOfDepartment(Guid depId)
        {
            return dbContext.Set<User>()
                            .Where(u => u.DepartmentId == depId)
                            .Include(p => p.Project).Include(ef => ef.EvaluationForms).ToList();
        }
        public IEnumerable<User> GetUsersOfProject(Guid proId)
        {
            return dbContext.Set<User>()
                            .Where(u => u.ProjectId == proId)
                            .Include(ef => ef.EvaluationForms).ToList();
        }

        public IEnumerable<User> GetUsersWithoutDepartment()
        {
            return dbContext.Set<User>()
                            .Where(u => u.DepartmentId ==  null)
                            .Include(p => p.Project).Include(ef => ef.EvaluationForms).ToList();
        }

        public IEnumerable<User> GetUsersWithoutProject(Guid depId)
        {
            return dbContext.Set<User>()
                            .Where(d=>d.DepartmentId==depId)
                            .Where(u => u.ProjectId == null)
                            .Include(ef => ef.EvaluationForms).ToList();
        }


        public User Update(User toUpdate)
        {
            dbContext.Set<User>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }

        public void DeleteById(Guid id)
        {
            var toDelete = GetById(id);
            dbContext.Set<User>().Remove(toDelete);
            dbContext.SaveChanges();
        }

    }
}
