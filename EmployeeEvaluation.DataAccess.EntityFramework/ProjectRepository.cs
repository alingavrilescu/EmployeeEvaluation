using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class ProjectRepository : IProjectRepository
    {
        protected readonly EmployeeEvaluationDbContext _dbcontext;
        public ProjectRepository(EmployeeEvaluationDbContext dbcontext)
        {
            this._dbcontext = dbcontext;
        }
        public Project Add(Project toAdd)
        {
            var project = this._dbcontext.Set<Project>().Add(toAdd);
            _dbcontext.SaveChanges();
            return project.Entity;
        }

        public void DeleteById(Guid id)
        {
            var toDelete = GetById(id);
            _dbcontext.Set<Project>().Remove(toDelete);
            _dbcontext.SaveChanges();
        }
        public Project AddUsersToProject(Guid proId, List<User> users)
        {
            var project = GetById(proId);
            foreach (var user in users)
            {
                project.Users.Add(user);
            }
            this._dbcontext.SaveChanges();
            return project;
        }

        public IEnumerable<Project> GetAll()
        {
            return _dbcontext.Set<Project>().Include(u => u.Users).Include(d =>d.Department).ToList();
        }

        public IEnumerable<Project> GetProjectsOfDepartment(Guid depId)
        {
            return _dbcontext.Set<Project>().Where(d=>d.DepartmentId==depId).Include(u => u.Users).ToList();
        }

        public Project GetById(Guid id)
        {
            var projectToReturn = _dbcontext.Set<Project>().Where(p => p.Id == id).Include(u => u.Users).Include(d=>d.Department).FirstOrDefault();
            if (projectToReturn == null)
            {
                throw new KeyNotFoundException("Product not found");
            }
            return projectToReturn;
        }

        public Project Update(Project toUpdate)
        {
            _dbcontext.Set<Project>().Update(toUpdate);
            _dbcontext.SaveChanges();
            return toUpdate;
        }
    }
}