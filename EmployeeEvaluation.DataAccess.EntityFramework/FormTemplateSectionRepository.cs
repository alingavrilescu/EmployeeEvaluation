using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class FormTemplateSectionRepository:BaseTemplateRepository<FormTemplateSection>,ITemplateSectionRepository
    {
        public FormTemplateSectionRepository(FormTemplateDbContext dbContext):base(dbContext)
        {

        }
    }
}
