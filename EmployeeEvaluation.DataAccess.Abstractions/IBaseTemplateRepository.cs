using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.DataAccess.Abstractions
{
    public interface IBaseTemplateRepository<T>where T : BaseTemplateEntity
    {
        public IEnumerable<T> GetAll();
        public T GetById(Guid id);
        public T Add(T toAdd);
        public void DeleteById(Guid id);
        public T Update(T toUpdate);


    }
}
