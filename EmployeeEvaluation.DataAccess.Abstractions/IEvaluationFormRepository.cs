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
        public EvaluationForm GetEvaluationFormById(Guid id);
        public IEnumerable<EvaluationForm> GetEvaluationFormByUserId(Guid id);
        public FormCriteria GetFormCriteriaById(Guid id);
        public EvaluationForm AddEvaluationForm (EvaluationForm evaluationFormToAdd);
        public CriteriaReviews AddCriteriaReviews(CriteriaReviews criteriaReviewsToAdd);
        public FormCriteria UpdateFormCriteria(FormCriteria formCriteria);
        public CriteriaReviews UpdateCriteriaReviews(CriteriaReviews criteriaReviewsToUpdate);
        public void DeleteEvaluationFormById(Guid id);
     
    }
}
