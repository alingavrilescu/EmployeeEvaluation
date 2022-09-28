
namespace EmployeeEvaluation.DataAccess.Model
{
    public class FormSection
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid EvaluationFormId { get; set; }
        //public EvaluationForm? EvaluationForm { get; set; }
        public ICollection<FormCriteria>? FormCriteria { get; set; }


    }
}
