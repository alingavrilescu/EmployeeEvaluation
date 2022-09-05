using EmployeeEvaluation.DataAccess.EntityFramework;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class FormTemplateCriteriaService
    {
        private readonly FormTemplateCriteriaRepository formTemplateCriteriaRepository;

        public FormTemplateCriteriaService(FormTemplateCriteriaRepository formTemplateCriteriaRepository)
        {
            this.formTemplateCriteriaRepository = formTemplateCriteriaRepository;
        }
        public IEnumerable<FormTemplateCriteria> GetAll()
        {
            var criteria = formTemplateCriteriaRepository.GetAll();
            return criteria;
        }
        public FormTemplateCriteria AddCriteria (FormTemplateCriteria toAdd)
        {
            return formTemplateCriteriaRepository.Add(toAdd);
        }

        public FormTemplateCriteria GetCriteria(Guid id)
        {
            return formTemplateCriteriaRepository.GetById(id);
        }

        public void DeleteCriteria(Guid sectionId)
        {
            formTemplateCriteriaRepository.DeleteById(sectionId);
        }

    }
}
