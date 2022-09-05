using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class FormCriteriaService
    {

        private readonly IFormCriteriaRepository _formCriteriaRepository;

        public FormCriteriaService(IFormCriteriaRepository formCriteriaRepository)
        {
            this._formCriteriaRepository = formCriteriaRepository;
        }

        public FormCriteria GetFormCriteriaById(Guid id)
        {
            return this._formCriteriaRepository.GetById(id);
        }

        public IEnumerable<FormCriteria> GetFormCriteria()
        {
            return this._formCriteriaRepository.GetAll();
        }

        public FormCriteria AddFormCriteria(FormCriteria toAdd)
        {
            return _formCriteriaRepository.Add(toAdd);
        }

        public void DeleteFormCriteria(Guid id)
        {
            this._formCriteriaRepository.DeleteById(id);
        }

        public FormCriteria UpdateFormCriteria(FormCriteria formCriteria)
        {
            var existingFormCriteria = _formCriteriaRepository.GetById(formCriteria.Id);
            existingFormCriteria.Name = formCriteria.Name;
            existingFormCriteria.Description = formCriteria.Description;
            existingFormCriteria.isChecked = formCriteria.isChecked;
            return existingFormCriteria;
        }

    }
}
