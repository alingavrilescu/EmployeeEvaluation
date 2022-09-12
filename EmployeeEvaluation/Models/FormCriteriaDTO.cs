namespace EmployeeEvaluation.Models
{
    public class FormCriteriaDTO
    {
        public string Name { get; set; }
        public bool isChecked { get; set; }
        public string Description { get; set; }
        public Guid FormSectionId { get; set; }
    }
}
