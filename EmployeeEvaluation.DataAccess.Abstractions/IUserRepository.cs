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
        public User GetUserById(Guid id);
        public User Add(User toAdd);
        public User Update(User toUpdate); 
        public void DeleteById(Guid id);
    }
}
