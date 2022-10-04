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
        public IEnumerable<CriteriaReviews> GetAll();
        public CriteriaReviews GetById(Guid id);
        public CriteriaReviews Add(CriteriaReviews toAdd);
        public void DeleteById(Guid id);
        public CriteriaReviews Update(CriteriaReviews toUpdate);

    }
}
