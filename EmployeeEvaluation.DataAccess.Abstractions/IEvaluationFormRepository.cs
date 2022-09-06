using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IEvaluationFormRepository
    {

        public IEnumerable<EvaluationForm> GetAll();
        public EvaluationForm GetById(Guid id);

        public EvaluationForm AddEvaluationForm (EvaluationForm toAdd);

    }
}
