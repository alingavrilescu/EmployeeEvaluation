using EmployeeEvaluation.DataAccess.Abstractions;
using EmployeeEvaluation.DataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeEvaluation.ApplicationLogic
{
    public class CriteriaCommentsService
    {

        private readonly ICriteriaCommentsRepository _criteriaCommentsRepository;

        public CriteriaCommentsService(ICriteriaCommentsRepository criteriaCommentsRepository)
        {
            this._criteriaCommentsRepository = criteriaCommentsRepository;
        }

        public CriteriaComments GetCriteriaCommentsById(Guid id)
        {
            return this._criteriaCommentsRepository.GetById(id);
        }

        public IEnumerable<CriteriaComments> GetCriteriaComments()
        {
            return this._criteriaCommentsRepository.GetAll();
        }

        public CriteriaComments AddCriteriaComments(CriteriaComments toAdd)
        {
            return _criteriaCommentsRepository.Add(toAdd);
        }

        public void DeleteCriteriaComments(Guid id)
        {
            this._criteriaCommentsRepository.DeleteById(id);
        }

        public CriteriaComments UpdateCriteriaComments(CriteriaComments criteriaComments)
        {
            var existingCriteriaComments = _criteriaCommentsRepository.GetById(criteriaComments.Id);
            existingCriteriaComments.Comment = criteriaComments.Comment;
            existingCriteriaComments.Attachment = criteriaComments.Attachment;
            return existingCriteriaComments;
        }

    }
}
