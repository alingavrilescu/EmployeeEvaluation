using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class EvaluationFormRepository
    {
        private readonly EmployeeEvaluationDbContext _employeeEvaluationDbContext;
        public EvaluationFormRepository(EmployeeEvaluationDbContext employeeEvaluationDbContext)
        {
            _employeeEvaluationDbContext = employeeEvaluationDbContext;
        }

        public IEnumerable<EvaluationForm> GetAll()
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Include(f => f.FormSections)
                                                             .ThenInclude(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaComments)
                                                             .ToList();
            return evaluationForm;
        }

        public EvaluationForm GetById(Guid id)
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Where(f => f.Id == id)
                                                             .Include(f => f.FormSections)
                                                             .ThenInclude(s => s.FormCriteria)
                                                             .ThenInclude(c => c.CriteriaComments)
                                                             .FirstOrDefault();

            return evaluationForm;

        }

        public EvaluationForm AddEvaluationForm(EvaluationForm toAdd)
        {
            var evaluationForm = _employeeEvaluationDbContext.Set<EvaluationForm>().Add(toAdd);
            _employeeEvaluationDbContext.SaveChanges();
            return evaluationForm.Entity;
        }
    }
}
