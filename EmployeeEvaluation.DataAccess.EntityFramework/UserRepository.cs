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
            return dbContext.Set<User>().ToList();
        }
        public User GetById(Guid id)
        {
            var userToReturn = dbContext.Set<User>().Where(u => u.Id == id).FirstOrDefault();
            if(userToReturn == null)
            {
                throw new KeyNotFoundException("User not found");
            }                               
            return userToReturn;
        }

        public void DeleteById(Guid id)
        {
            var toDelete = GetById(id);
            dbContext.Set<User>().Remove(toDelete);
            dbContext.SaveChanges();
        }

    }
}
