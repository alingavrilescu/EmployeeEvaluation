using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface ICriteriaCommentsRepository
    {
        public IEnumerable<CriteriaComments> GetAll();
        public CriteriaComments GetById(Guid id);
        public CriteriaComments Add(CriteriaComments toAdd);
        public void DeleteById(Guid id);
        public CriteriaComments Update(CriteriaComments toUpdate);

    }
}
