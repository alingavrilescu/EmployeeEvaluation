namespace EmployeeEvaluation.DataAccess.Model
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}