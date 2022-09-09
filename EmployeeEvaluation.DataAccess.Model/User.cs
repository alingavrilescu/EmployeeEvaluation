using System.ComponentModel.DataAnnotations;

namespace EmployeeEvaluation.DataAccess.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string Role { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? ProjectId { get; set; }
        public ICollection<EvaluationForm>? EvaluationForms { get; set; }
    }
}
