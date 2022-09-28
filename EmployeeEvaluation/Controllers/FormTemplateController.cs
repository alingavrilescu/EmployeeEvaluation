using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeEvaluation.Controllers
{
    [Route("api/Department/{departmentId}/[controller]")]
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
        public IEnumerable<FormTemplate> GetFormTemplatesOfDepartment(Guid departmentId)
        {
            return formTemplateService.GetFormTemplatesOfDepartment(departmentId);
        }

        // GET api/<FormTemplateController>
        [HttpGet("{id}")]
        public FormTemplate GetFormTemplateById(Guid id)
        {
            return formTemplateService.GetFormTemplateById(id);
        }

        // POST api/<FormTemplateController>
        [HttpPost]
        public FormTemplate AddFormTemplate ([FromBody] FormTemplate formTemplate)
        {
            
            var formTemplateToAdd = new FormTemplate
            {
                Name = formTemplate.Name,
                Type = formTemplate.Type,
                DepartmentId=formTemplate.DepartmentId
            };
            return formTemplateService.AddFormTemplate(formTemplate);
        }

        // PUT api/<FormTemplateController>/5
        [HttpPut("{id}")]
        public FormTemplate PutFormTemplate(Guid id, [FromBody] FormTemplate formTemplate)
        {
            var formTemplateToEdit = formTemplateService.GetFormTemplateById(id);

            formTemplateToEdit.Name = formTemplate.Name;
            formTemplateToEdit.Type = formTemplate.Type;
            formTemplateToEdit.DepartmentId = formTemplate.DepartmentId;

            return formTemplateService.UpdateFormTemplate(formTemplateToEdit);

        }

        // DELETE api/<FormTemplateController>/5
        [HttpDelete("{id}")]
        public void DeleteFormTemplate(Guid id)
        {
            formTemplateService.DeleteFormTemplate(id);
        }

        //-------------------------------------------------------------------------------


        [HttpGet("{formTemplateId}/FormTemplateSection")]
        public IEnumerable<FormTemplateSection> GetTemplateSections(Guid formTemplateId)
        {
            return formTemplateService.GetSections(formTemplateId);
        }

        // GET api/<FormTemplateController>/5
        [HttpGet("{formTemplateId}/FormTemplateSection/{id}")]
        public FormTemplateSection GetTemplateSectionById(Guid id)
        {
            return formTemplateService.GetSectionById(id);
        }

        // POST api/<FormTemplateController>
        [HttpPost("{formTemplateId}/FormTemplateSection")]
        public FormTemplate PostTemplateSection(Guid formTemplateId,[FromBody] FormTemplateSection formTemplateSection)
        {
            var formTemplateSectionToAdd = new FormTemplateSection
            {
                Name = formTemplateSection.Name,
                Description = formTemplateSection.Description,
                FormTemplateId = formTemplateId
            };
            return formTemplateService.AddTemplateSection(formTemplateId,formTemplateSectionToAdd);
        }

        // PUT api/<FormTemplateController>/5
        [HttpPut("{formTemplateId}/FormTemplateSection/{id}")]
        public FormTemplateSection PutTemplateSection(Guid id, [FromBody] FormTemplateSection formTemplateSection)
        {
            var sectionToEdit = formTemplateService.GetSectionById(id);

            sectionToEdit.Name = formTemplateSection.Name;
            sectionToEdit.Description = formTemplateSection.Description;
            sectionToEdit.FormTemplateId = formTemplateSection.FormTemplateId;
   
            return formTemplateService.UpdateSection(sectionToEdit);

        }

        // DELETE api/<FormTemplateController>/5
        [HttpDelete("{formTemplateId}/FormTemplateSection/{id}")]
        public void DeleteSection(Guid id)
        {
            formTemplateService.DeleteSection(id);
        }

        [HttpGet("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria")]
        public IEnumerable<FormTemplateCriteria> GetCriteria(Guid formSectionId)
        {
            return formTemplateService.GetCriteria(formSectionId);
        }

        // GET api/<FormTemplateController>/5
        [HttpGet("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria/{id}")]
        public FormTemplateCriteria GetCriteriaById(Guid id)
        {
            return formTemplateService.GetCriteriaById(id);
        }

        // POST api/<FormTemplateController>
        [HttpPost("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria")]
        public FormTemplateSection PostFormTemplate(Guid formSectionId,[FromBody] FormTemplateCriteria formTemplateCriteria)
        {
            var formTemplateCriteriaToAdd = new FormTemplateCriteria
            {
                Name = formTemplateCriteria.Name,
                Description = formTemplateCriteria.Description,
                FormTemplateSectionId = formSectionId
            };
            return formTemplateService.AddTemplateCriteria(formSectionId,formTemplateCriteriaToAdd);
        }

        // PUT api/<FormTemplateController>/5
        [HttpPut("{formTemplateId}/FormTemplateSection/{formSectionId}/FormTemplateCriteria/{id}")]
        public FormTemplateCriteria PutFormTemplate(Guid id, [FromBody] FormTemplateCriteria formTemplateCriteria)
        {
            var formTemplateCriteriaToEdit = new FormTemplateCriteria
            {
                Name = formTemplateCriteria.Name,
                Description = formTemplateCriteria.Description,
                FormTemplateSectionId= formTemplateCriteria.FormTemplateSectionId
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
