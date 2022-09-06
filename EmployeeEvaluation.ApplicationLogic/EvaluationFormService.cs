using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class EvaluationFormService
    {
        private readonly IEvaluationFormRepository _evaluationFormRepository;

        public EvaluationFormService(IEvaluationFormRepository evaluationFormRepository)
        {
            this._evaluationFormRepository = evaluationFormRepository;
        }

        public EvaluationForm GetEvaluationFormById(Guid id)
        {
            return this._evaluationFormRepository.GetById(id);
        }

        public IEnumerable<EvaluationForm> GetEvaluationForm()
        {
            return this._evaluationFormRepository.GetAll();
        }

        public EvaluationForm AddEvaluationForm(EvaluationForm toAdd)
        {
            return _evaluationFormRepository.AddEvaluationForm(toAdd);
        }
    }
}
