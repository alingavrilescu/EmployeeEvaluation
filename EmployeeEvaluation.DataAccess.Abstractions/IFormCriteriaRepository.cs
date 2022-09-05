using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IFormCriteriaRepository
    {

        public IEnumerable<FormCriteria> GetAll();
        public FormCriteria GetById(Guid id);
        public FormCriteria Add(FormCriteria toAdd);
        public void DeleteById(Guid id);
        public FormCriteria Update(FormCriteria toUpdate);

    }
}
