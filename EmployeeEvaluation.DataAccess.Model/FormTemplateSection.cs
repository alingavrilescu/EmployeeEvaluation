using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Model
{
    public class FormTemplateSection:BaseTemplateEntity
    {
  
        public string Description { get; set; }
        public Guid FormTemplateId { get; set; }
        public ICollection<FormTemplateCriteria>? TemplateCriteria { get; set; }
    }
}
