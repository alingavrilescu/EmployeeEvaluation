namespace EmployeeEvaluation.DataAccess.Model
{
    public class FormCriteria
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Choice { get; set; }
        public string Description { get; set; }
        public string? Comment { get; set; }
        public string? Attachment { get; set; }
        public Guid FormSectionId { get; set; }
        public ICollection<CriteriaReviews>? CriteriaReviews { get; set; }

    }
}
