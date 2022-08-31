using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class ProjectRepository : IProjectRepository
    {
        protected readonly ProjectDbcontext _dbcontext;
        public ProjectRepository(ProjectDbcontext dbcontext)
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

        public IEnumerable<Project> GetAll()
        {
            return _dbcontext.Set<Project>().ToList();
        }

        public Project GetById(Guid id)
        {
            var projectToReturn = _dbcontext.Set<Project>().Where(p => p.Id == id).FirstOrDefault();
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