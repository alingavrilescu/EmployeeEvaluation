using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class FormCriteriaRepository
    {
      /*
        public readonly FormDbcontext dbContext;
        public FormCriteriaRepository(FormDbcontext dbContext)
        {
            this.dbContext = dbContext;
        }

        public FormCriteria Add(FormCriteria toAdd)
        {
            var formCriteria = dbContext.Set<FormCriteria>().Add(toAdd);
            dbContext.SaveChanges();
            return formCriteria.Entity;
        }
        public IEnumerable<FormCriteria> GetAll()
        {
            return dbContext.Set<FormCriteria>().ToList();
        }
        //public FormCriteria GetById(Guid id)
        //{
        //    var formCriteriaToReturn = dbContext.Set<FormCriteria>().Where(c => c.Id == id).Include(s => s.FormSection).FirstOrDefault();
        //    if (formCriteriaToReturn == null)
        //    {
        //        throw new KeyNotFoundException("Form criteria not found");
        //    }
        //    return formCriteriaToReturn;
        //}

        //public void DeleteById(Guid id)
        //{
        //    var toDelete = GetById(id);
        //    dbContext.Set<FormCriteria>().Remove(toDelete);
        //    dbContext.SaveChanges();
        //}

        public FormCriteria Update(FormCriteria toUpdate)
        {
            dbContext.Set<FormCriteria>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }
      */
    }
}
