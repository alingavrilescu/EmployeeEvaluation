﻿using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class EvaluationFormService
    {
        private readonly IEvaluationFormRepository _evaluationFormRepository;

        public EvaluationFormService(IEvaluationFormRepository evaluationFormRepository)
        {
            this._evaluationFormRepository = evaluationFormRepository;
        }
        public IEnumerable<EvaluationForm> GetEvaluationForm()
        {
            return this._evaluationFormRepository.GetAll();
        }

        public IEnumerable<FormSection> GetAllFormSections() 
        {
            return this._evaluationFormRepository.GetAllFormSections();
        }
        public IEnumerable<FormCriteria> GetAllFormCriteria()
        {
            return this._evaluationFormRepository.GetAllFormCriteria();
        }
        public IEnumerable<CriteriaReviews> GetAllCriteriaComments()
        { 
            return this._evaluationFormRepository.GetAllCriteriaComments(); 
        }

        public EvaluationForm GetEvaluationFormById(Guid id)
        {
            return this._evaluationFormRepository.GetEvaluationFormById(id);
        }
        public EvaluationForm GetEvaluationFormByUserId(Guid id)
        {
            return this._evaluationFormRepository.GetEvaluationFormByUserId(id);
        }
        public FormSection GetFormSectionById(Guid id)
        {
            return this._evaluationFormRepository.GetFormSectionById(id);
        }
        public FormCriteria GetFormCriteriaById(Guid id)
        {
            return this._evaluationFormRepository.GetFormCriteriaById(id);
        }
        public CriteriaReviews GetCriteriaCommentsById(Guid id)
        {
            return this._evaluationFormRepository.GetCriteriaCommentsById(id);
        }

        public EvaluationForm AddEvaluationForm(EvaluationForm toAdd)
        {
            return _evaluationFormRepository.AddEvaluationForm(toAdd);
        }

        public FormSection AddFormSection(FormSection toAdd)
        {
            return _evaluationFormRepository.AddFormSection(toAdd);
        }

        public FormCriteria AddFormCriteria(FormCriteria toAdd)
        {
            return _evaluationFormRepository.AddFormCriteria(toAdd);
        }
        public CriteriaReviews AddCriteriaComments(CriteriaReviews toAdd)
        {
            return _evaluationFormRepository.AddCriteriaComments(toAdd);
        }

        public EvaluationForm UpdateEvaluationForm(EvaluationForm evaluationForm)
        {
            return _evaluationFormRepository.UpdateEvaluationForm(evaluationForm);
        }

        public FormSection UpdateFormSection(FormSection formSection)
        {
            return _evaluationFormRepository.UpdateFormSection(formSection);        
        }

        public FormCriteria UpdateFormCriteria(FormCriteria formCriteria)
        {
            return _evaluationFormRepository.UpdateFormCriteria(formCriteria);
        }
        public CriteriaReviews UpdateCriteriaComments(CriteriaReviews criteriaComments)
        {
            return _evaluationFormRepository.UpdateCriteriaComments(criteriaComments);
        }
        public void DeleteEvaluationFormById(Guid id)
        {
            this._evaluationFormRepository.DeleteEvaluationFormById(id);
        }
        public void DeleteFormSectionById(Guid id)
        {
            this._evaluationFormRepository.DeleteFormSectionById(id);
        }
        public void DeleteFormCriteriaById(Guid id)
        {
            this._evaluationFormRepository.DeleteFormCriteriaById(id);
        }
        public void DeleteCriteriaCommentsById(Guid id)
        {
            this._evaluationFormRepository.DeleteCriteriaCommentsById(id);
        }

    }
}
