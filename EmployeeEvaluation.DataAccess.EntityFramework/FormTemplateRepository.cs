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
    public class FormTemplateRepository:BaseTemplateRepository<FormTemplate>,IFormTemplateRepository
    {
        public FormTemplateRepository(FormTemplateDbContext dbContext) : base(dbContext)
        { }
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
    }
}
