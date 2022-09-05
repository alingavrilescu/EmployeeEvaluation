

namespace EmployeeEvaluation.DataAccess.Model
{
    public class EvaluationForm
    {
        public Guid Id{ get; set; }
        public string Name{ get; set; } 
        public string Type{ get; set; }
        public Guid UserId { get; set; }
        public ICollection<FormSection>? FormSections{ get; set; }
    }
}
