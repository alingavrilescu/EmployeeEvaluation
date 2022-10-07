﻿using EmployeeEvaluation.ApplicationLogic;
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
        private readonly FormTemplateService _formTemplateService;
        public EvaluationFormController(EvaluationFormService evaluationFormService, FormTemplateService formTemplateService)
        {
            this._evaluationFormService = evaluationFormService;
            this._formTemplateService = formTemplateService;
        }
        [HttpGet ("user/{userId}")]
        [SwaggerResponse(StatusCodes.Status200OK, "Action was successful")]
        [SwaggerResponse(StatusCodes.Status400BadRequest, "Invalid")]
        [SwaggerResponse(StatusCodes.Status500InternalServerError, "Server error ocurred and is logged")]
        [ProducesResponseType(typeof(EvaluationFormDTO), StatusCodes.Status200OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public IEnumerable<EvaluationForm> GetEvaluationForms(Guid userId)
        {
            return this._evaluationFormService.GetEvaluationFormByUserId(userId);
        }

        [HttpGet("{id}")]
        public EvaluationForm GetEvaluationFormById(Guid id)
        {
            return this._evaluationFormService.GetEvaluationFormById(id);
        }

        [HttpGet("{id}/criteria-details/{criteriaId}")]
        public FormCriteria GetFormCriteriaById(Guid criteriaId)
        {
            return this._evaluationFormService.GetFormCriteriaById(criteriaId);
        }


        [HttpPost("{id}/{templateId}")]
        public EvaluationForm AddEvaluationForm(Guid id, Guid templateId)
        {
            var formTemplateToGet = _formTemplateService.GetFormTemplateById(templateId);

            var evaluationFormToAdd = new EvaluationForm
            {
                Name = formTemplateToGet.Name,
                Type = formTemplateToGet.Type,
                UserId = id,
                FormSections = new List<FormSection>()
           
            };

            if (formTemplateToGet.TemplateSections != null)
            {
                foreach (var formTemplateSection in formTemplateToGet.TemplateSections)
                {
                    var formSection = new FormSection();
                    formSection.Name = formTemplateSection.Name;
                    formSection.Description = formTemplateSection.Description;
                    formSection.FormCriteria = new List<FormCriteria>();
                    if(formTemplateSection.TemplateCriteria != null) { 
                    foreach (var formTemplateCriteria in formTemplateSection.TemplateCriteria)
                    {
                        var formCriteria = new FormCriteria();
                        formCriteria.Name = formTemplateCriteria.Name;
                        formCriteria.Description = formTemplateCriteria.Description;
                        //formCriteria.isChecked = false;
                        formSection.FormCriteria.Add(formCriteria);
                    }
                    evaluationFormToAdd.FormSections.Add(formSection);
                }
                    }
            }
            return this._evaluationFormService.AddEvaluationForm(evaluationFormToAdd);
        }

        [HttpGet("criteria/{criteriaId}")]
        public IEnumerable<CriteriaReviews> GetCriteriaReviews(Guid criteriaId)
        {
            return this._evaluationFormService.GetCriteriaReviews(criteriaId);
        }

        //=========================================DE MODIFICAT AICI =========================================
        [HttpPost("criteria/{criteriaId}/add-review")]
        public CriteriaReviews AddCriteriaReviews(Guid criteriaId, [FromBody] CriteriaReviewDTO criteriaReview)
        {
            var criteriaReviewToAdd = new CriteriaReviews
            {
                Review = criteriaReview.Review,
                FormCriteriaId = criteriaId
            };
            return this._evaluationFormService.AddCriteriaComments(criteriaReviewToAdd);
        }

        //=========================================DE MODIFICAT AICI =========================================
        [HttpPut("{criteriaId}/FormCriteria")]
        public FormCriteria UpdateCriteriaComment(Guid criteriaId,[FromBody] FormCriteriaDTO formCriteria)
        {
            var criteriaToUpdate = this._evaluationFormService.GetFormCriteriaById(criteriaId);
            if (formCriteria.Choice != null)
            {
                criteriaToUpdate.Choice = formCriteria.Choice;
            }
            if (formCriteria.Comment != null)
            {
                criteriaToUpdate.Comment = formCriteria.Comment;
            }
            if (formCriteria.Attachment != null)
            {
                criteriaToUpdate.Attachment = formCriteria.Attachment;
            }

            return this._evaluationFormService.UpdateFormCriteria(criteriaToUpdate);
        }

        [HttpDelete("{id}")]
        public void DeleteEvaluationForm(Guid id)
        {
            this._evaluationFormService.DeleteEvaluationFormById(id);
        }


    }
}
