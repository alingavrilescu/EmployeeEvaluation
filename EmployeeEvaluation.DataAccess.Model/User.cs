using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public Guid AppUserId { get; set; }
        public Guid? ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}
