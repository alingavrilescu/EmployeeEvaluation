using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class CriteriaCommentsRepository
    {

        public readonly FormDbcontext dbContext;
        public CriteriaCommentsRepository(FormDbcontext dbContext)
        {
            this.dbContext = dbContext;
        }

        public CriteriaComments Add(CriteriaComments toAdd)
        {
            var criteriaComments = dbContext.Set<CriteriaComments>().Add(toAdd);
            dbContext.SaveChanges();
            return criteriaComments.Entity;
        }
        public IEnumerable<CriteriaComments> GetAll()
        {
            return dbContext.Set<CriteriaComments>().ToList();
        }
        public CriteriaComments GetById(Guid id)
        {
            var criteriaCommentsToReturn = dbContext.Set<CriteriaComments>().Where(cr => cr.Id == id).Include(c => c.FormCriteria).FirstOrDefault();
            if (criteriaCommentsToReturn == null)
            {
                throw new KeyNotFoundException("Criteria comments not found");
            }
            return criteriaCommentsToReturn;
        }

        public void DeleteById(Guid id)
        {
            var toDelete = GetById(id);
            dbContext.Set<CriteriaComments>().Remove(toDelete);
            dbContext.SaveChanges();
        }

        public CriteriaComments Update(CriteriaComments toUpdate)
        {
            dbContext.Set<CriteriaComments>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }
    }
}
