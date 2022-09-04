using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeEvaluation.DataAccess.Model;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class FormTemplateDbContext:DbContext
    {
        public FormTemplateDbContext(DbContextOptions<FormTemplateDbContext> options) : base(options)
        {
        }
        DbSet<FormTemplate> FormTemplates { get; set; } 
        DbSet<FormTemplateSection> FormTemplateSections { get; set; }
        DbSet<FormTemplateCriteria> FormTemplateCriteria { get; set; }
    }
}
