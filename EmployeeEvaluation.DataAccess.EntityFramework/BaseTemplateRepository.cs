using EmployeeEvaluation.DataAccess.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class BaseTemplateRepository<T> : IBaseTemplateRepository<T> where T : BaseTemplateEntity
    {
        protected readonly FormTemplateDbContext dbContext;
        public BaseTemplateRepository(FormTemplateDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public IEnumerable<T> GetAll()
        {
            return dbContext.Set<T>().ToList();
        }
        public T GetById(Guid id)
        {
          var formTemplate = dbContext.Set<T>().Where(f => f.Id == id).First();
          return formTemplate;
        }
        public T Add(T toAdd)
        {
            var entity=dbContext.Set<T>().Add(toAdd);
            dbContext.SaveChanges();
            return entity.Entity;
        }
        
        public void DeleteById(Guid id)
        {
            var toDelete = GetById(id);
            dbContext.Set<T>().Remove(toDelete);
            dbContext.SaveChanges();
        }
        
        public T Update(T toUpdate)
        {
            dbContext.Set<T>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }
        
        
    }
}
