using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.Models
{
    public class ProjectDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid? ProjectManagerId { get; set; }
        public Guid TeamLeadId { get; set; }
    }
}
