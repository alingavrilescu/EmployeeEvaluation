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
        public FormSection GetFormSectionById(Guid id);
        public FormCriteria GetFormCriteriaById(Guid id);
        public CriteriaComments GetCriteriaCommentsById(Guid id);
        public EvaluationForm AddEvaluationForm (EvaluationForm evaluationFormToAdd);
        public FormSection AddFormSection(FormSection formSectionToAdd);
        public FormCriteria AddFormCriteria(FormCriteria formCriteriaToAdd);
        public CriteriaComments AddCriteriaComments(CriteriaComments criteriaCommentsToAdd);
        public EvaluationForm UpdateEvaluationForm (EvaluationForm evaluationFormToUpdate);
        public FormSection UpdateFormSection(FormSection formSectionToUpdate);
        public FormCriteria UpdateFormCriteria(FormCriteria formCriteriaToUpdate);
        public CriteriaComments UpdateCriteriaComments(CriteriaComments criteriaCommentsToUpdate);
        
    }
}
