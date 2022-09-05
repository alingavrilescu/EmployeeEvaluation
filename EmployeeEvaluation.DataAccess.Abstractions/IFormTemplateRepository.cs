using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IFormTemplateRepository:IBaseTemplateRepository<FormTemplate>
    {
        public FormTemplate GetFormTemplateById(Guid id);
        public IEnumerable<FormTemplate> GetFormTemplates();
        
    }
}
