using EmployeeEvaluation.DataAccess.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.EntityFramework
{
    public class ProjectDbcontext : DbContext
    {
        public ProjectDbcontext(DbContextOptions options) : base(options)
        {
        }

        DbSet<Project> Projects { get; set; }
    }
}
