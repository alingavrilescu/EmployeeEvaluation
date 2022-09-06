using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Model
{
    public class FormCriteria
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool isChecked { get; set; }
        public string Description { get; set; }
        public Guid FormSectionId { get; set; }
        //public FormSection? FormSection { get; set; }
        public ICollection<CriteriaComments>? CriteriaComments { get; set; }

    }
}
