using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class EmployeeEvaluationDbContext : DbContext
    {
        public EmployeeEvaluationDbContext(DbContextOptions<EmployeeEvaluationDbContext> options) : base(options)
        {

        }

        DbSet<Project> Projects { get; set; }
        DbSet<User> User { get; set; }
        DbSet<FormTemplate> FormTemplates { get; set; }
        DbSet<FormTemplateSection> FormTemplateSections { get; set; }
        DbSet<FormTemplateCriteria> FormTemplateCriteria { get; set; }
        DbSet<EvaluationForm> EvaluationForm { get; set; }
        DbSet<FormSection> FormSections { get; set; }
        DbSet<FormCriteria> FormCriteria { get; set; }
        DbSet<CriteriaReviews> CriteriaReviews { get; set; }
        DbSet<Department> Departments { get; set; }
    }
}
