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
        public IEnumerable<EvaluationForm> GetEvaluationForm()
        {
            return this._evaluationFormRepository.GetAll();
        }

        public EvaluationForm GetEvaluationFormById(Guid id)
        {
            return this._evaluationFormRepository.GetEvaluationFormById(id);
        }
        public EvaluationForm GetEvaluationFormByUserId(Guid id)
        {
            return this._evaluationFormRepository.GetEvaluationFormByUserId(id);
        }

        public FormCriteria GetFormCriteriaById(Guid id)
        {
            return this._evaluationFormRepository.GetFormCriteriaById(id);
        }

        public FormCriteria AddComment(FormCriteria formCriteria)
        {
            return this._evaluationFormRepository.AddComment(formCriteria);
        }

        public EvaluationForm AddEvaluationForm(EvaluationForm toAdd)
        {
            return _evaluationFormRepository.AddEvaluationForm(toAdd);
        }

        public CriteriaReviews AddCriteriaComments(CriteriaReviews toAdd)
        {
            return _evaluationFormRepository.AddCriteriaReviews(toAdd);
        }

        public CriteriaReviews UpdateCriteriaComments(CriteriaReviews criteriaReviews)
        {
            return _evaluationFormRepository.UpdateCriteriaReviews(criteriaReviews);
        }
        public void DeleteEvaluationFormById(Guid id)
        {
            this._evaluationFormRepository.DeleteEvaluationFormById(id);
        }

    }
}
