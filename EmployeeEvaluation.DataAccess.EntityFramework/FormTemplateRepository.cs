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
        private readonly EmployeeEvaluationDbContext dbContext;
        public FormTemplateRepository(EmployeeEvaluationDbContext dbContext) 
        { 
            this.dbContext = dbContext;
        }
        public FormTemplate GetFormTemplateById(Guid id)
        {
            var formTemplates = dbContext.Set<FormTemplate>().Where(f => f.Id == id)
                                                             .Include(f => f.TemplateSections)
                                                             .ThenInclude(s => s.TemplateCriteria)
                                                             .FirstOrDefault();
            if(formTemplates == null)
            {
                throw new KeyNotFoundException("Form template not found.");
            }
            return formTemplates;

        }
        
        public IEnumerable<FormTemplate> GetFormTemplates()
        {
            var formTemplates = dbContext.Set<FormTemplate>().Include(f => f.TemplateSections)
                                                             .ThenInclude(s => s.TemplateCriteria)
                                                             .ToList();
            return formTemplates;
        }
        public FormTemplate AddFormTemplate(FormTemplate toAdd)
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
        public void DeleteFormTemplate(Guid id)
        {
            var toDelete = GetFormTemplateById(id);
            dbContext.Set<FormTemplate>().Remove(toDelete);
            dbContext.SaveChanges();
        }

        public FormTemplateSection GetSectionById( Guid sectionId )
        {
            var formTemplateSection = dbContext.Set<FormTemplateSection>().Where(s => s.Id==sectionId)
                                                                          .Include(s => s.TemplateCriteria)
                                                                          .FirstOrDefault();
            if(formTemplateSection == null)
            {
                throw new KeyNotFoundException("Section not found.");
            }
            return formTemplateSection;
        }

        public IEnumerable<FormTemplateSection> GetSections(Guid formTemplateId)
        {
            var formTemplateSections = dbContext.Set<FormTemplateSection>().Where(s => s.FormTemplateId == formTemplateId)
                                                                           .Include(s => s.TemplateCriteria)
                                                                           .ToList();
            return formTemplateSections;
        }
        public FormTemplateSection AddSectionTemplate(FormTemplateSection toAdd)
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
        public void DeleteSection(Guid sectionId)
        {
            var toDelete = GetSectionById(sectionId);
            dbContext.Set<FormTemplateSection>().Remove(toDelete);
            dbContext.SaveChanges();
        }

        public FormTemplateCriteria GetCriteriaById( Guid criteriaId)
        {
            var criteria = dbContext.Set<FormTemplateCriteria>().Where(c => c.Id == criteriaId)
                                                                .FirstOrDefault();
            if(criteria == null)
            {
                throw new KeyNotFoundException("Criteria not found");
            }
            return criteria;
        }
        public IEnumerable<FormTemplateCriteria> GetCriteria(Guid sectionId)
        {
            var criteria = dbContext.Set<FormTemplateCriteria>().Where(c => c.FormTemplateSectionId == sectionId)
                                                               .ToList();
            return criteria;
        }
        public FormTemplateCriteria AddCriteriaTemplate(FormTemplateCriteria toAdd)
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
        public void DeleteCriteria(Guid criteriaId)
        {
            var toDelete= GetCriteriaById(criteriaId);
            dbContext.Set<FormTemplateCriteria>().Remove(toDelete);
            dbContext.SaveChanges();
        }
    }
}
