namespace EmployeeEvaluation.DataAccess.Model
{
    public class CriteriaReviews
    {
        public Guid Id { get; set; }
        public string Review { get; set; }
        public Guid FormCriteriaId { get; set; }
        //public FormCriteria? FormCriteria { get; set; }

    }
}
