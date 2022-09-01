using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class UserRepository
    {
        public readonly UserDbContext dbContext;
        public UserRepository(UserDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
         public User Add(User toAdd)
        {
            var user = dbContext.Set<User>.Add(toAdd);
            dbContext.SaveChanges();
            return user;
        }
        public IEnumerable<User> GetUsers()
        {
            var users = dbContext.Set<User>()
                .ToList;
            return users;
        }
    }
}
