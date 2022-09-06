using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormTemplateController : ControllerBase
    {
        // GET: api/<FormTemplateController>
        private readonly FormTemplateService formTemplateService;

        public FormTemplateController(FormTemplateService formTemplateService)
        {
            this.formTemplateService = formTemplateService;
        }
        
        [HttpGet]
        public IEnumerable<FormTemplate> Get()
        {
            return formTemplateService.GetFormTemplates();
        }

        // GET api/<FormTemplateController>/5
        [HttpGet("{id}")]
        public FormTemplate Get(Guid id)
        {
            return formTemplateService.GetFormTemplate(id);
        }

        // POST api/<FormTemplateController>
        [HttpPost]
        public void Post([FromBody] FormTemplate formTemplate)
        {
            formTemplateService.AddFormTemplate(formTemplate);
        }

        // PUT api/<FormTemplateController>/5
        [HttpPut("{id}")]
        public void Put( [FromBody] FormTemplate formTemplate)
        {
            formTemplateService.UpdateFormTemplate(formTemplate);
        }
        

        // DELETE api/<FormTemplateController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            formTemplateService.DeleteFormTemplate(id);
        }
        
    }
        
}
