using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormTemplateCriteriaController : ControllerBase
    {

        private readonly FormTemplateCriteriaService formTemplateCriteriaService;
        public FormTemplateCriteriaController(FormTemplateCriteriaService formTemplateCriteriaService)
        {
            this.formTemplateCriteriaService = formTemplateCriteriaService;
        }
       
        // GET: api/<FormTemplateCriteriaController>
        [HttpGet]
        public IEnumerable<FormTemplateCriteria> Get()
        {
            return formTemplateCriteriaService.GetAll();
        }

        // GET api/<FormTemplateCriteriaController>/5
        [HttpGet("{id}")]
        public FormTemplateCriteria Get(Guid id)
        {
            return formTemplateCriteriaService.GetCriteria(id);
        }

        // POST api/<FormTemplateCriteriaController>
        [HttpPost]
        public void Post([FromBody] FormTemplateCriteria formTemplateCriteria)
        {
            formTemplateCriteriaService.AddCriteria(formTemplateCriteria);
        }

        // DELETE api/<FormTemplateCriteriaController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            formTemplateCriteriaService.DeleteCriteria(id);
        }
        
    }
}
