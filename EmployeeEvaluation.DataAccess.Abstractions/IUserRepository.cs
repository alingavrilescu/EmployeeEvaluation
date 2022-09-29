using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetAll();
        public IEnumerable<User> GetUsersOfDepartment(Guid depId);
        public IEnumerable<User> GetUsersOfProject(Guid proId);
        public IEnumerable<User> GetUsersWithoutDepartment();
        public IEnumerable<User> GetUsersWithoutProject(Guid depId);
        public IEnumerable<User> GetDevs(Guid depId);
        public IEnumerable<User> GetHODepsWithoutDep();
        public IEnumerable<User> GetHODeps(Guid depId);
        public IEnumerable<User> GetProjectManagers(Guid depId);
        public IEnumerable<User> GetTeamLeads(Guid depId);
        public IEnumerable<User> GetProjectManagersWithoutProject(Guid depId, Guid proId);
        public IEnumerable<User> GetTeamLeadsWithoutProject(Guid depId, Guid proId);
        public IEnumerable<User> GetTeamLeadsWithoutProject(Guid depId);
        public User GetUserById(Guid id);
        public User Add(User toAdd);
        public User Update(User toUpdate); 
        public void DeleteById(Guid id);
    }
}
