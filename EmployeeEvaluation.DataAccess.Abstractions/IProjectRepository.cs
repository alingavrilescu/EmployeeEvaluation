using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IProjectRepository
    {
        public IEnumerable<Project> GetAll();
        public IEnumerable<Project> GetProjectsOfDepartment(Guid depId);
        public Project AddUsersToProject(Guid proId, List<User> users);
        public Project RemoveUserFromProject(Guid proId, User user);
        public Project GetById(Guid id);
        public Project Add(Project toAdd);
        public void DeleteById(Guid id);
        public Project Update(Project toUpdate);
    }
}