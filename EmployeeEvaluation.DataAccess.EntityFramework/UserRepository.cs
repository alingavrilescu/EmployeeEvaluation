using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class UserRepository
    {
        public readonly ProjectDbcontext dbContext;
        public UserRepository(ProjectDbcontext dbContext)
        {
            this.dbContext = dbContext;
        }
         public User Add(User toAdd)
        {
            var user = dbContext.Set<User>().Add(toAdd);
            dbContext.SaveChanges();
            return user.Entity;
        }
        public IEnumerable<User> GetUsers()
        {
            return dbContext.Set<User>()
                .ToList();
        }
        public User GetUserById(Guid id)
        {
            var user = dbContext.Set<User>().Where(u => u.Id == id)
                                          .First();
            return user;
        }

        public void DeleteById(Guid id)
        {
            var toDelete = GetUserById(id);
            dbContext.Set<User>()
                     .Remove(toDelete);
            dbContext.SaveChanges();
        }

        public User Update(User toUpdate)
        {
            dbContext.Set<User>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }
    }
}
