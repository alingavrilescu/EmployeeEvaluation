using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class EvaluationFormDbContext: DbContext
    {
        public EvaluationFormDbContext(DbContextOptions<EvaluationFormDbContext> options) : base(options)
        {
        }

    }
}
