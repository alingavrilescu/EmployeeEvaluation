using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Model
{
    public class Department
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid HeadOfDepartmentId { get; set; }
        public ICollection<User>? Users { get; set; }
        public ICollection<FormTemplate>? FormTemplates { get; set; }
    }
}
