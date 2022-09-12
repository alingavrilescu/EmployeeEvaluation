using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetAll();
        public User GetById(Guid id);
        public User Add(User toAdd);
        public User Update(User toUpdate); 
        public void DeleteById(Guid id);
    }
}
