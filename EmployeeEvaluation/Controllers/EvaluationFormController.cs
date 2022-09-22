using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace EmployeeEvaluation.Controllers
{
    [Route("api/Users/[controller]")]
    [ApiController]
    public class EvaluationFormController : ControllerBase
    {
        private readonly EvaluationFormService _evaluationFormService;
        public EvaluationFormController(EvaluationFormService evaluationFormService)
        {
            this._evaluationFormService = evaluationFormService;
        }
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, "Action was successful")]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Server error ocurred and is logged")]
        [ProducesResponseType(typeof(EvaluationFormDTO), StatusCodes.Status200OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public IEnumerable<EvaluationForm> GetEvaluationForms()
        {
            return this._evaluationFormService.GetEvaluationForm();
        }

        [HttpGet("{id}")]
        public EvaluationForm GetEvaluationFormByUserId(Guid id)
        {
            return this._evaluationFormService.GetEvaluationFormByUserId(id);
        }

        [HttpGet("FormSection")]
        public  IEnumerable<FormSection> GetFormSections()
        {
            return this._evaluationFormService.GetAllFormSections();
        }
        [HttpGet("FormSection/FormCriteria")]
        public IEnumerable<FormCriteria> GetFormCriterias()
        {
            return this._evaluationFormService.GetAllFormCriteria();
        }
        [HttpGet("FormSection/FormCriteria/CriteriaComments")]
        public IEnumerable<CriteriaComments> GetCriteriaComments()
        {
            return this._evaluationFormService.GetAllCriteriaComments();
        }

        [HttpPost]
        public EvaluationForm AddEvaluationForm([FromBody] EvaluationFormDTO evaluationForm)
        {
            var evaluationFormToAdd = new EvaluationForm
            {
                Name = evaluationForm.Name,
                Type = evaluationForm.Type,
                UserId = evaluationForm.UserId
            };
            return this._evaluationFormService.AddEvaluationForm(evaluationFormToAdd);
        }

        [HttpPost("{formId}/FormSection")]
        public FormSection AddSection(Guid formId, [FromBody] FormSectionDTO formSection)
        {
            var existingEvaluationForm = this._evaluationFormService.GetEvaluationFormById(formId);
            formSection.EvaluationFormId = existingEvaluationForm.Id;
            var formSectionToAdd = new FormSection
            {
                Name = formSection.Name,
                Description = formSection.Description,
                EvaluationFormId = formSection.EvaluationFormId
            };
            return this._evaluationFormService.AddFormSection(formSectionToAdd);
        }
        [HttpPost("{formId}/FormSection/{sectionId}/FormCriteria")]
        public FormCriteria AddCriteria(Guid sectionId, [FromBody] FormCriteriaDTO formCriteria)
        {
            var existingFormSection = this._evaluationFormService.GetFormSectionById(sectionId);
            formCriteria.FormSectionId = existingFormSection.Id;
            var formCriteriaToAdd = new FormCriteria
            {
                Name = formCriteria.Name,
                Description = formCriteria.Description,
                isChecked = formCriteria.isChecked,
                FormSectionId = formCriteria.FormSectionId
            };
            return this._evaluationFormService.AddFormCriteria(formCriteriaToAdd);
        }
        [HttpPost("{formId}/FormSection/{sectionId}/FormCriteria/{criteriaId}/CriteriaComments")]
        public CriteriaComments AddCriteriaComments(Guid criteriaId, [FromBody] CriteriaCommentsDTO criteriaComments)
        {
            var existingFormCriteria = this._evaluationFormService.GetFormCriteriaById(criteriaId);
            criteriaComments.CriteriaId = existingFormCriteria.Id;
            var criteriaCommentsToAdd = new CriteriaComments
            {
                Comment = criteriaComments.Comment,
                Attachment = criteriaComments.Attachment,
                FormCriteriaId = criteriaComments.CriteriaId
            };
            return this._evaluationFormService.AddCriteriaComments(criteriaCommentsToAdd);
        }

        [HttpPut("{id}")]
        public EvaluationForm UpdateEvaluationForm(Guid id, EvaluationFormDTO evaluationForm)
        {
            var evaluationFormToUpdate = this._evaluationFormService.GetEvaluationFormById(id);
            evaluationFormToUpdate.Name = evaluationForm.Name;
            evaluationFormToUpdate.Type = evaluationForm.Type;

            return this._evaluationFormService.UpdateEvaluationForm(evaluationFormToUpdate);
        }
        [HttpPut("{formId}/FormSection/{sectionId}")]
        public FormSection UpdateFormSection(Guid sectionId, FormSectionDTO formSection)
        {
            var formSectionToUpdate = this._evaluationFormService.GetFormSectionById(sectionId);
            formSectionToUpdate.Name = formSection.Name;
            formSectionToUpdate.Description = formSection.Description;

            return this._evaluationFormService.UpdateFormSection(formSectionToUpdate);
        }
        [HttpPut("{formId}/FormSection/{sectionId}/FormCriteria/{criteriaId}")]
        public FormCriteria UpdateFormCriteria(Guid criteriaId, FormCriteriaDTO formCriteria)
        {
            var formCriteriaToUpdate = this._evaluationFormService.GetFormCriteriaById(criteriaId);
            formCriteriaToUpdate.Name = formCriteria.Name;
            formCriteriaToUpdate.isChecked = formCriteria.isChecked;
            formCriteriaToUpdate.Description = formCriteria.Description;

            return this._evaluationFormService.UpdateFormCriteria(formCriteriaToUpdate);
        }
        [HttpPut("{formId}/FormSection/{sectionId}/FormCriteria/{criteriaId}/CriteriaComments/{criteriaCommentsId}")]
        public CriteriaComments UpdateCriteriaComments(Guid criteriaCommentsId, CriteriaCommentsDTO criteriaComments)
        {
            var criteriaCommentsToUpdate = this._evaluationFormService.GetCriteriaCommentsById(criteriaCommentsId);
            criteriaCommentsToUpdate.Comment = criteriaComments.Comment;
            criteriaComments.Attachment = criteriaComments.Attachment;

            return this._evaluationFormService.UpdateCriteriaComments(criteriaCommentsToUpdate);
        }

        [HttpDelete("{id}")]
        public void DeleteEvaluationForm(Guid id)
        {
            this._evaluationFormService.DeleteEvaluationFormById(id);
        }

        [HttpDelete("{formId}/FormSection/{sectionId}")]
        public void DeleteFormSection(Guid sectionId)
        {
            this._evaluationFormService.DeleteFormSectionById(sectionId);
        }

        [HttpDelete("{formId}/FormSection/{sectionId}/FormCriteria/{criteriaId}")]
        public void DeleteFormCriteria(Guid criteriaId)
        {
            this._evaluationFormService.DeleteFormCriteriaById(criteriaId);
        }
        [HttpDelete("{formId}/FormSection/{sectionId}/FormCriteria/{criteriaId}/CriteriaComments/{criteriaCommentsId}")]
        public void DeleteFormCriteriaComments(Guid criteriaCommentsId)
        {
            this._evaluationFormService.DeleteCriteriaCommentsById(criteriaCommentsId);
        }

    }
}
