using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Model
{
    public class FormTemplateCriteria:BaseTemplateEntity
    {
 
        public string Description { get; set; }
        public Guid FormTemplateSectionId { get; set; }    
    }
}
