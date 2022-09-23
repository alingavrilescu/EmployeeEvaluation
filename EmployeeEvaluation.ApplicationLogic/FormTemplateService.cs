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
        public FormTemplate GetFormTemplateById(Guid id)
        {
            return formTemplateRepository.GetFormTemplateById(id);
        }
        public IEnumerable<FormTemplate> GetFormTemplatesOfDepartment(Guid departmentId)
        {
            return formTemplateRepository.GetFormTemplatesOfDepartment(departmentId);
        }
        //public IEnumerable<FormTemplate> GetFormTemplates()
        //{
        //    return formTemplateRepository.GetFormTemplates();
        //}
        //public FormTemplate AddFormTemplate(FormTemplate toAdd)
        //{
        //    return formTemplateRepository.AddFormTemplate(toAdd);
        //}

        public FormTemplate UpdateFormTemplate(FormTemplate formTemplate)
        {
            return formTemplateRepository.UpdateFormTemplate(formTemplate);
        }
        public void DeleteFormTemplate(Guid formTemplateId)
        {
            formTemplateRepository.DeleteFormTemplate(formTemplateId);
        }

        public FormTemplateSection GetSectionById(Guid sectionId)
        {
            return formTemplateRepository.GetSectionById(sectionId);
        }
        public IEnumerable<FormTemplateSection> GetSections(Guid formTemplateId)
        {
            return formTemplateRepository.GetSections(formTemplateId);
        }
        public FormTemplate AddTemplateSection(Guid formTemplateId,FormTemplateSection toAdd)
        {
            return formTemplateRepository.AddSectionToFormTemplate(formTemplateId,toAdd);
        }
        public FormTemplateSection UpdateSection(FormTemplateSection section)
        {
            return formTemplateRepository.UpdateSection(section);
        }
        public void DeleteSection(Guid sectionId)
        {
            formTemplateRepository.DeleteSection(sectionId);
        }

        public FormTemplateCriteria GetCriteriaById(Guid criteriaId)
        {
            return formTemplateRepository.GetCriteriaById(criteriaId);
        }
        public IEnumerable<FormTemplateCriteria> GetCriteria(Guid sectionId)
        {
            return formTemplateRepository.GetCriteria(sectionId);
        }
        public FormTemplateSection AddTemplateCriteria(Guid formTemplateSectionId, FormTemplateCriteria toAdd)
        {
            return formTemplateRepository.AddCriteriaToTemplateSection(formTemplateSectionId,toAdd);
        }
        public FormTemplateCriteria UpdateCriteria(FormTemplateCriteria criteria)
        {
            return formTemplateRepository.UpdateCriteria(criteria);
        }
        public void DeleteCriteria(Guid criteriaId)
        {
            formTemplateRepository.DeleteCriteria(criteriaId);
        }

    }
}

