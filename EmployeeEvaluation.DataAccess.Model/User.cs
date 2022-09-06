namespace EmployeeEvaluation.DataAccess.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public Guid AppUserId { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid? ProjectId { get; set; }
        public Project? Project { get; set; }
        public ICollection<EvaluationForm>? EvaluationForms { get; set; }
    }
}
