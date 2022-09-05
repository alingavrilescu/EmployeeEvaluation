using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class FormTemplateService
    {
        private readonly IFormTemplateRepository formTemplateRepository;
       

        public FormTemplateService(IFormTemplateRepository formTemplateRepository)
        {
            this.formTemplateRepository = formTemplateRepository;
           
        }
        public FormTemplate GetFormTemplate(Guid id)
        {
            return formTemplateRepository.GetFormTemplateById(id);
        }
        public IEnumerable<FormTemplate> GetFormTemplates()
        {
            return formTemplateRepository.GetFormTemplates();
        }
        public FormTemplate AddFormTemplate(FormTemplate toAdd)
        {
            return formTemplateRepository.Add(toAdd);
        }
        public void DeleteFormTemplate(Guid formTemplateId)
        {
            formTemplateRepository.DeleteById(formTemplateId);
        }

        public FormTemplate UpdateFormTemplate(Guid id,FormTemplate formTemplate)
        {
            var existingFormTemplate = formTemplateRepository.GetById(id);
            existingFormTemplate.Type=formTemplate.Type;
            existingFormTemplate.Name = formTemplate.Name;
            existingFormTemplate.DepartmentId=formTemplate.DepartmentId;
            formTemplateRepository.Update(existingFormTemplate);
            return existingFormTemplate;
        }
       
    }
        
}
        
