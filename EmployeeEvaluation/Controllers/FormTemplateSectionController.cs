using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormTemplateSectionController : ControllerBase
    {
        private readonly FormTemplateSectionService formTemplateSectionService;

        public FormTemplateSectionController(FormTemplateSectionService formTemplateSectionService)
        {
            this.formTemplateSectionService = formTemplateSectionService;
        }

        
        // GET: api/<FormTemplateSectionController>
        [HttpGet]
        public IEnumerable<FormTemplateSection> Get()
        {
            return formTemplateSectionService.GetAll();
        }

        // GET api/<FormTemplateSectionController>/5
        [HttpGet("{id}")]
        public FormTemplateSection Get(Guid id)
        {
            return formTemplateSectionService.GetSection(id);
        }

        // POST api/<FormTemplateSectionController>
        [HttpPost]
        public void Post([FromBody] FormTemplateSection formTemplateSection)
        {
            formTemplateSectionService.AddSection(formTemplateSection);
        }

        // PUT api/<FormTemplateSectionController>/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] FormTemplateSection formTemplateSection)
        {
            formTemplateSectionService.UpdateSection(id, formTemplateSection);
        }
        
        // DELETE api/<FormTemplateSectionController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            formTemplateSectionService.DeleteSection(id);
        }
        
    }
    
}
