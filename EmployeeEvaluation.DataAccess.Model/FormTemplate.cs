using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Model
{
    public class FormTemplate:BaseTemplateEntity
    {

        public string Type { get; set; }
        public Guid DepartmentId { get; set; }
        public ICollection <FormTemplateSection>? TemplateSections { get; set; }

    }
}
