using EmployeeEvaluation.DataAccess.EntityFramework;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class FormTemplateSectionService
    {
        private readonly FormTemplateSectionRepository formTemplateSectionRepository;

        public FormTemplateSectionService(FormTemplateSectionRepository formTemplateSectionRepository)
        {
            this.formTemplateSectionRepository = formTemplateSectionRepository;
        }

        public IEnumerable<FormTemplateSection> GetAll()
        {
            var sections=formTemplateSectionRepository.GetAll();
            return sections;
        }
        public FormTemplateSection AddSection(FormTemplateSection toAdd)
        {
            return formTemplateSectionRepository.Add(toAdd);
        }
         public FormTemplateSection UpdateSection(Guid id,FormTemplateSection formTemplateSection)
         {
             var existingFormTemplateSection = formTemplateSectionRepository.GetById(id);
             existingFormTemplateSection.Description = formTemplateSection.Description;
             existingFormTemplateSection.Name = formTemplateSection.Name;
             formTemplateSectionRepository.Update(existingFormTemplateSection);
             return existingFormTemplateSection;
         }
    
        public FormTemplateSection GetSection(Guid id)
        {
            return formTemplateSectionRepository.GetById(id);
        }
    
        public void DeleteSection(Guid sectionId)
        {
            formTemplateSectionRepository.DeleteById(sectionId);
        }
       

    }
}
