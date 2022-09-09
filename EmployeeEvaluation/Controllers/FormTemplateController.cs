using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/Department/[controller]")]
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
        public IEnumerable<FormTemplate> GetFormTemplates()
        {
            return formTemplateService.GetFormTemplates();
        }

        // GET api/<FormTemplateController>/5
        [HttpGet("{id}")]
        public FormTemplate GetFormTemplateById(Guid id)
        {
            return formTemplateService.GetFormTemplateById(id);
        }

        // POST api/<FormTemplateController>
        [HttpPost]
        public FormTemplate PostFormTemplate([FromBody] FormTemplateDTO formTemplate)
        {
            var formTemplateToAdd = new FormTemplate
            {
                Name = formTemplate.Name,
                Type = formTemplate.Type,
                DepartmentId = formTemplate.DepartmentId
            };
            return formTemplateService.AddFormTemplate(formTemplateToAdd);
        }

        // PUT api/<FormTemplateController>/5
        [HttpPut("{id}")]
        public FormTemplate PutFormTemplate( [FromBody] FormTemplateDTO formTemplate)
        {
            var formTemplateToEdit = new FormTemplate
            {
                Name = formTemplate.Name,
                Type = formTemplate.Type
                
            };
            return formTemplateService.UpdateFormTemplate(formTemplateToEdit);
            
        }

        // DELETE api/<FormTemplateController>/5
        [HttpDelete("{id}")]
        public void DeleteFormTemplate (Guid id)
        {
            formTemplateService.DeleteFormTemplate(id);
        }

       //-------------------------------------------------------------------------------


        [HttpGet("{formTemplateId}/FormTemplateSection")]
        public IEnumerable<FormTemplateSection> GetTemplateSections(Guid formTemplateId)
        {
            return formTemplateService.GetAllSections(formTemplateId);
        }

        // GET api/<FormTemplateController>/5
        [HttpGet("{formTemplateId}/FormTemplateSection/{id}")]
        public FormTemplateSection GetTemplateSectionById(Guid id)
        {
            return formTemplateService.GetSectionById(id);
        }

        // POST api/<FormTemplateController>
        [HttpPost("{formTemplateId}/FormTemplateSection")]
        public FormTemplateSection PostTemplateSection(Guid formTemplateId,[FromBody] FormTemplateSectionDTO formTemplateSection)
        {
            var formTemplateSectionToAdd = new FormTemplateSection
            {
                Name = formTemplateSection.Name,
                Description = formTemplateSection.Description
            };
            return formTemplateService.AddTemplateSection(formTemplateSectionToAdd);
        }

        // PUT api/<FormTemplateController>/5
        [HttpPut("{formTemplateId}/FormTemplateSection/{id}")]
        public FormTemplateSection PutTemplateSection([FromBody] FormTemplateSectionDTO formTemplateSection)
        {
            var formTemplateSectionToEdit = new FormTemplateSection
            {
                Name = formTemplateSection.Name,
                Description = formTemplateSection.Description
            };
            return formTemplateService.UpdateSection(formTemplateSectionToEdit);

        }

        // DELETE api/<FormTemplateController>/5
        [HttpDelete("{formTemplateId}/FormTemplateSection/{id}")]
        public void DeleteSection(Guid id)
        {
            formTemplateService.DeleteSection(id);
        }

        //----------------------------------------------------------------------------

        [HttpGet("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria")]
        public IEnumerable<FormTemplateCriteria> GetAllCriteria(Guid sectionId)
        {
            return formTemplateService.GetAllCriteria(sectionId);
        }

        // GET api/<FormTemplateController>/5
        [HttpGet("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria/{id}")]
        public FormTemplateCriteria GetCriteriaById(Guid id)
        {
            return formTemplateService.GetCriteriaById(id);
        }

        // POST api/<FormTemplateController>
        [HttpPost("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria")]
        public FormTemplateCriteria PostFormTemplate(Guid formTemplateSectionId,[FromBody] FormTemplateCriteriaDTO formTemplateCriteria)
        {
            var formTemplateCriteriaToAdd = new FormTemplateCriteria
            {
                Name = formTemplateCriteria.Name,
                Description = formTemplateCriteria.Description
            };
            return formTemplateService.AddTemplateCriteria(formTemplateCriteriaToAdd);
        }

        // PUT api/<FormTemplateController>/5
        [HttpPut("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria/{id}")]
        public FormTemplateCriteria PutFormTemplate(Guid formTemplateSectionId,[FromBody] FormTemplateCriteriaDTO formTemplateCriteria)
        {
            var formTemplateCriteriaToEdit = new FormTemplateCriteria
            {
                Name = formTemplateCriteria.Name,
                Description = formTemplateCriteria.Description
            };
            return formTemplateService.UpdateCriteria(formTemplateCriteriaToEdit);

        }

        // DELETE api/<FormTemplateController>/5
        [HttpDelete("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria/{id}")]
        public void DeleteCriteria(Guid id)
        {
            formTemplateService.DeleteCriteria(id);
        }
   
    }
        
}
