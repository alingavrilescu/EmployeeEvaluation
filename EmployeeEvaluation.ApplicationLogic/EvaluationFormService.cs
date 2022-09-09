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
        public FormSection GetFormSectionById(Guid id)
        {
            return this._evaluationFormRepository.GetFormSectionById(id);
        }
        public FormCriteria GetFormCriteriaById(Guid id)
        {
            return this._evaluationFormRepository.GetFormCriteriaById(id);
        }
        public CriteriaComments GetCriteriaCommentsById(Guid id)
        {
            return this._evaluationFormRepository.GetCriteriaCommentsById(id);
        }

        public EvaluationForm AddEvaluationForm(EvaluationForm toAdd)
        {
            return _evaluationFormRepository.AddEvaluationForm(toAdd);
        }

        public FormSection AddFormSection(FormSection toAdd)
        {
            return _evaluationFormRepository.AddFormSection(toAdd);
        }

        public FormCriteria AddFormCriteria(FormCriteria toAdd)
        {
            return _evaluationFormRepository.AddFormCriteria(toAdd);
        }
        public CriteriaComments AddCriteriaComments(CriteriaComments toAdd)
        {
            return _evaluationFormRepository.AddCriteriaComments(toAdd);
        }

        public EvaluationForm UpdateEvaluationForm(EvaluationForm evaluationForm)
        {
            return _evaluationFormRepository.UpdateEvaluationForm(evaluationForm);
        }

        public FormSection UpdateFormSection(FormSection formSection)
        {
            return _evaluationFormRepository.UpdateFormSection(formSection);        
        }

        public FormCriteria UpdateFormCriteria(FormCriteria formCriteria)
        {
            return _evaluationFormRepository.UpdateFormCriteria(formCriteria);
        }
        public CriteriaComments UpdateCriteriaComments(CriteriaComments criteriaComments)
        {
            return _evaluationFormRepository.UpdateCriteriaComments(criteriaComments);
        }
        public void DeleteeEvaluationFormById(Guid id)
        {
            this._evaluationFormRepository.DeleteEvaluationFormById(id);
        }

    }
}
