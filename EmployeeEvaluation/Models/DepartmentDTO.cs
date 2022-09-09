namespace EmployeeEvaluation.Models
{
    public class DepartmentDTO
    {
        string Id { get; set; }
        public string Name { get; set; }
        public Guid HeadOfDepartmentId { get; set; }

    }
}
