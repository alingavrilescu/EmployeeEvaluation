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
        public FormCriteria GetFormCriteriaById(Guid id)
        {
            var formCriteria = _employeeEvaluationDbContext.Set<FormCriteria>().Where(f => f.Id == id)
                                                             .Include(c => c.CriteriaReviews)
                                                             .FirstOrDefault();

            return formCriteria;

        }
        public  IEnumerable<EvaluationForm> GetEvaluationFormByUserId(Guid id)
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Where(f => f.UserId == id)
                                                             .Include(f => f.FormSections)
                                                             .ThenInclude(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaReviews)
                                                             .ToList();

            return evaluationForm;

        }

        
        public EvaluationForm AddEvaluationForm(EvaluationForm evaluationFormToAdd)
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Add(evaluationFormToAdd);
            _employeeEvaluationDbContext.SaveChanges();
            return evaluationForm.Entity;
        }
        public FormCriteria UpdateFormCriteria(FormCriteria formCriteria)
        {
            _employeeEvaluationDbContext.Set<FormCriteria>().Update(formCriteria);
            _employeeEvaluationDbContext.SaveChanges();
            return formCriteria;
        }

        public IEnumerable<CriteriaReviews> GetCriteriaReviews(Guid criteriaId)
        {
            var criteriaReview = _employeeEvaluationDbContext.Set<CriteriaReviews>()
                                                             .Where(criteria => criteria.Id == criteriaId).ToList();

            return criteriaReview;

        }

        public CriteriaReviews AddCriteriaReviews (CriteriaReviews criteriaReviewsToAdd)
        {
            var criteriaReviews = _employeeEvaluationDbContext.Set<CriteriaReviews>().Add(criteriaReviewsToAdd);
            _employeeEvaluationDbContext.SaveChanges();
            return criteriaReviews.Entity;
        }

        public CriteriaReviews UpdateCriteriaReviews(CriteriaReviews criteriaReviewsToUpdate)
        {
            _employeeEvaluationDbContext.Set<CriteriaReviews>().Update(criteriaReviewsToUpdate);
            _employeeEvaluationDbContext.SaveChanges();
            return criteriaReviewsToUpdate;
        }

        public void DeleteEvaluationFormById(Guid id)
        {
            var evaluationFormToDelete = GetEvaluationFormById(id);
            _employeeEvaluationDbContext.Set<EvaluationForm>().Remove(evaluationFormToDelete);
            _employeeEvaluationDbContext.SaveChanges();
        }

    }
}
