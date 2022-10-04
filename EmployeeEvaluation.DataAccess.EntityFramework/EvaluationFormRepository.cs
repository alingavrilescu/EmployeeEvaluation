using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class EvaluationFormRepository: IEvaluationFormRepository
    {
        private readonly EmployeeEvaluationDbContext _employeeEvaluationDbContext;
        public EvaluationFormRepository(EmployeeEvaluationDbContext employeeEvaluationDbContext)
        {
            _employeeEvaluationDbContext = employeeEvaluationDbContext;
        }

        public IEnumerable<EvaluationForm> GetAll()
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>()
                                                             .Include(f => f.FormSections)
                                                             .ThenInclude(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaReviews)
                                                             .ToList();
            return evaluationForm;
        }

        public EvaluationForm GetEvaluationFormById(Guid id)
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Where(f => f.Id == id)
                                                             .Include(f => f.FormSections)
                                                             .ThenInclude(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaReviews)
                                                             .FirstOrDefault();

            return evaluationForm;

        }
        public EvaluationForm GetEvaluationFormByUserId(Guid id)
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Where(f => f.UserId == id)
                                                             .Include(f => f.FormSections)
                                                             .ThenInclude(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaReviews)
                                                             .FirstOrDefault();

            return evaluationForm;

        }

        public FormSection GetFormSectionById(Guid id)
        {
            var formSection = _employeeEvaluationDbContext.Set<FormSection>().Where(f => f.Id == id)
                                                             .Include(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaReviews)
                                                             .FirstOrDefault();

            return formSection;

        }
        public IEnumerable<FormSection> GetAllFormSections()
        {
            var formSection = _employeeEvaluationDbContext.Set<FormSection>()
                                                             .Include(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaReviews)
                                                             .ToList();

            return formSection;

        }
        public FormCriteria GetFormCriteriaById(Guid id)
        {
            var formCriteria = _employeeEvaluationDbContext.Set<FormCriteria>().Where(f => f.Id == id)
                                                             .Include(c => c.CriteriaReviews)
                                                             .FirstOrDefault();

            return formCriteria;

        }
        public IEnumerable<FormCriteria> GetAllFormCriteria()
        {
            var formCriteria = _employeeEvaluationDbContext.Set<FormCriteria>()
                                                             .Include(c => c.CriteriaReviews)
                                                             .ToList();

            return formCriteria;

        }
        public CriteriaReviews GetCriteriaCommentsById(Guid id)
        {
            var criteriaComments = _employeeEvaluationDbContext.Set<CriteriaReviews>().Where(f => f.Id == id)
                                                             .FirstOrDefault();

            return criteriaComments;

        }
        public IEnumerable<CriteriaReviews> GetAllCriteriaComments()
        {
            var criteriaComments = _employeeEvaluationDbContext.Set<CriteriaReviews>()
                                                             .ToList();

            return criteriaComments;

        }
        public EvaluationForm AddEvaluationForm(EvaluationForm evaluationFormToAdd)
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Add(evaluationFormToAdd);
            _employeeEvaluationDbContext.SaveChanges();
            return evaluationForm.Entity;
        }

        public FormSection AddFormSection(FormSection formSectionToAdd)
        {
            var formSection = _employeeEvaluationDbContext.Set<FormSection>().Add(formSectionToAdd);
            _employeeEvaluationDbContext.SaveChanges();
            return formSection.Entity;
        }
        public FormCriteria AddFormCriteria(FormCriteria formCriteriaToAdd)
        {
            var formCriteria = _employeeEvaluationDbContext.Set<FormCriteria>().Add(formCriteriaToAdd);
            _employeeEvaluationDbContext.SaveChanges();
            return formCriteria.Entity;
        }

        public CriteriaReviews AddCriteriaComments (CriteriaReviews criteriaCommentsToAdd)
        {
            var criteriaComments = _employeeEvaluationDbContext.Set<CriteriaReviews>().Add(criteriaCommentsToAdd);
            _employeeEvaluationDbContext.SaveChanges();
            return criteriaComments.Entity;
        }

        public EvaluationForm UpdateEvaluationForm(EvaluationForm evaluationFormToUpdate)
        {
            _employeeEvaluationDbContext.Set<EvaluationForm>().Update(evaluationFormToUpdate);
            _employeeEvaluationDbContext.SaveChanges();
            return evaluationFormToUpdate;
        }
        public FormSection UpdateFormSection(FormSection formSectionToUpdate)
        {
            _employeeEvaluationDbContext.Set<FormSection>().Update(formSectionToUpdate);
            _employeeEvaluationDbContext.SaveChanges();
            return formSectionToUpdate;
        }
        public FormCriteria UpdateFormCriteria(FormCriteria formCriteriaToUpdate)
        {
            _employeeEvaluationDbContext.Set<FormCriteria>().Update(formCriteriaToUpdate);
            _employeeEvaluationDbContext.SaveChanges();
            return formCriteriaToUpdate;
        }

        public CriteriaReviews UpdateCriteriaComments(CriteriaReviews criteriaCommentsToUpdate)
        {
            _employeeEvaluationDbContext.Set<CriteriaReviews>().Update(criteriaCommentsToUpdate);
            _employeeEvaluationDbContext.SaveChanges();
            return criteriaCommentsToUpdate;
        }

        public void DeleteEvaluationFormById(Guid id)
        {
            var evaluationFormToDelete = GetEvaluationFormById(id);
            _employeeEvaluationDbContext.Set<EvaluationForm>().Remove(evaluationFormToDelete);
            _employeeEvaluationDbContext.SaveChanges();
        }
        public void DeleteFormSectionById(Guid id)
        {
            var formSectionToDelete= GetFormSectionById(id);
            _employeeEvaluationDbContext.Set<FormSection>().Remove(formSectionToDelete);
            _employeeEvaluationDbContext.SaveChanges();
        }
        public void DeleteFormCriteriaById(Guid id)
        {
            var formCriteriaToDelete = GetFormCriteriaById(id);
            _employeeEvaluationDbContext.Set<FormCriteria>().Remove(formCriteriaToDelete);
            _employeeEvaluationDbContext.SaveChanges();
        }
        public void DeleteCriteriaCommentsById(Guid id)
        {
            var criteriaCommentsToDelete = GetCriteriaCommentsById(id);
            _employeeEvaluationDbContext.Set<CriteriaReviews>().Remove(criteriaCommentsToDelete);
            _employeeEvaluationDbContext.SaveChanges();
        }

    }
}
