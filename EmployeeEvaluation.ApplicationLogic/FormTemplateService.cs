using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.EntityFramework;
using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class FormTemplateService
    {
        private readonly FormTemplateRepository formTemplateRepository;
       

        public FormTemplateService(FormTemplateRepository formTemplateRepository)
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
            formTemplateRepository.DeleteFormTemplateById(formTemplateId);
        }

        public FormTemplate UpdateFormTemplate(FormTemplate formTemplate)
        {
            var existingFormTemplate = formTemplateRepository.GetFormTemplateById(formTemplate.Id);
            existingFormTemplate.Type=formTemplate.Type;
            existingFormTemplate.Name = formTemplate.Name;
            return existingFormTemplate;
        }
        //public IEnumerable<FormTemplateSection> GetSections
       
    }
        
}
        
