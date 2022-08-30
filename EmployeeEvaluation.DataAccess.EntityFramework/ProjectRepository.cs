using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class ProjectRepository : IProjectRepository
    {
        public Project Add(Project toAdd)
        {
            throw new NotImplementedException();
        }

        public void DeleteById(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> GetAll()
        {
            throw new NotImplementedException();
        }

        public Project GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Project Update(Project toUpdate)
        {
            throw new NotImplementedException();
        }
    }
}