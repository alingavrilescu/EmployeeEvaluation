namespace EmployeeEvaluation.DataAccess.Model
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
        public Guid? ProjectManagerId { get; set; }
        public Guid TeamLeadId { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}