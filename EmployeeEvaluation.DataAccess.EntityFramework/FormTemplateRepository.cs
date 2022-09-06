using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 
using Microsoft.EntityFrameworkCore;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class FormTemplateRepository
    {
        private readonly FormTemplateDbContext dbContext;
        public FormTemplateRepository(FormTemplateDbContext dbContext) 
        { 
            this.dbContext = dbContext;
        }
        public FormTemplate GetFormTemplateById(Guid id)
        {
            var formTemplates = dbContext.Set<FormTemplate>().Where(f => f.Id == id)
                                                             .Include(f => f.TemplateSections)
                                                             .ThenInclude(s => s.TemplateCriteria)
                                                             .FirstOrDefault();
                                                             
            return formTemplates;

        }
        
        public IEnumerable<FormTemplate> GetFormTemplates()
        {
            var formTemplates = dbContext.Set<FormTemplate>().Include(f => f.TemplateSections)
                                                             .ThenInclude(s => s.TemplateCriteria)
                                                             .ToList();
            return formTemplates;
        }
        public FormTemplate Add(FormTemplate toAdd)
        {
            var entity = dbContext.Set<FormTemplate>().Add(toAdd);
            dbContext.SaveChanges();
            return entity.Entity;
        }
        public FormTemplate UpdateFormTemplate(FormTemplate toUpdate)
        {
            dbContext.Set<FormTemplate>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }
        public void DeleteFormTemplateById(Guid id)
        {
            var toDelete = GetFormTemplateById(id);
            dbContext.Set<FormTemplate>().Remove(toDelete);
            dbContext.SaveChanges();
        }

        public FormTemplateSection GetSectionById(Guid formTemplateId, Guid sectionId )
        {
            var formTemplateSection = dbContext.Set<FormTemplateSection>().Where(s => s.FormTemplateId == formTemplateId)
                                                                          .Where(s => s.Id==sectionId)
                                                                          .Include(s => s.TemplateCriteria)
                                                                          .FirstOrDefault();
            return formTemplateSection;
        }

        public IEnumerable<FormTemplateSection> GetSections(Guid formTemplateId)
        {
            var formTemplateSections = dbContext.Set<FormTemplateSection>().Where(s => s.FormTemplateId == formTemplateId)
                                                                           .Include(s => s.TemplateCriteria)
                                                                           .ToList();
            return formTemplateSections;
        }
        public FormTemplateSection Add(FormTemplateSection toAdd)
        {
            var entity = dbContext.Set<FormTemplateSection>().Add(toAdd);
            dbContext.SaveChanges();
            return entity.Entity;
        }
        public FormTemplateSection UpdateSection(FormTemplateSection toUpdate)
        {
            dbContext.Set<FormTemplateSection>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }
        public void DeleteSectionById(Guid formTemplateId, Guid sectionId)
        {
            var toDelete = GetSectionById(formTemplateId, sectionId);
            dbContext.Set<FormTemplateSection>().Remove(toDelete);
            dbContext.SaveChanges();
        }

        public FormTemplateCriteria GetCriteriaById(Guid sectionId, Guid criteriaId)
        {
            var criteria = dbContext.Set<FormTemplateCriteria>().Where(c => c.FormTemplateSectionId == sectionId)
                                                                .Where(c => c.Id == criteriaId)
                                                                .FirstOrDefault();
            return criteria;
        }
        public IEnumerable<FormTemplateCriteria> GetCriteria(Guid sectionId)
        {
            var criteria = dbContext.Set<FormTemplateCriteria>().Where(c => c.FormTemplateSectionId == sectionId)
                                                               .ToList();
            return criteria;
        }
        public FormTemplateCriteria Add(FormTemplateCriteria toAdd)
        {
            var entity = dbContext.Set<FormTemplateCriteria>().Add(toAdd);
            dbContext.SaveChanges();
            return entity.Entity;
        }
        public FormTemplateCriteria UpdateCriteria(FormTemplateCriteria toUpdate)
        {
            dbContext.Set<FormTemplateCriteria>().Update(toUpdate);
            dbContext.SaveChanges();
            return toUpdate;
        }
        public void DeleteCriteriaById(Guid sectionId, Guid criteriaId)
        {
            var toDelete= GetCriteriaById(sectionId, criteriaId);
            dbContext.Set<FormTemplateCriteria>().Remove(toDelete);
            dbContext.SaveChanges();
        }
    }
}
