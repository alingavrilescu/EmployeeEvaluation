using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.DataAccess.Model;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Mvc;

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
        public IEnumerable<EvaluationForm> Get()
        {
            return this._evaluationFormService.GetEvaluationForm();
        }

        [HttpGet("{id}")]
        public EvaluationForm Get(Guid id)
        {
            return this._evaluationFormService.GetEvaluationFormById(id);
        }

        [HttpPost]
        public EvaluationForm Post([FromBody] EvaluationFormDTO evaluationForm)
        {
            var evaluationFormToAdd = new EvaluationForm
            {
                Name = evaluationForm.Name,
                Type = evaluationForm.Type,
                UserId = evaluationForm.UserId
            };
            return this._evaluationFormService.AddEvaluationForm(evaluationFormToAdd);
        }

        [HttpPut("{id}")]
        public EvaluationForm Put(Guid id, EvaluationFormDTO evaluationForm)
        {
            var evaluationFormToUpdate = this._evaluationFormService.GetEvaluationFormById(id);
            evaluationFormToUpdate.Name = evaluationForm.Name;
            evaluationFormToUpdate.Type = evaluationForm.Type;

            return this._evaluationFormService.UpdateEvaluationForm(evaluationFormToUpdate);
        }

        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            this._evaluationFormService.DeleteeEvaluationFormById(id);
        }
    }
}
