using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IProjectRepository
    {
        public IEnumerable<Project> GetAll();
        public IEnumerable<Project> GetProjectsOfDepartment(Guid depId);
        public Project GetById(Guid id);
        public Project Add(Project toAdd);
        public void DeleteById(Guid id);
        public Project Update(Project toUpdate);
    }
}