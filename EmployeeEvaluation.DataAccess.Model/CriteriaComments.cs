﻿namespace EmployeeEvaluation.DataAccess.Model
{
    public class CriteriaComments
    {
        public Guid Id { get; set; }
        public string Comment { get; set; }
        public string Attachment { get; set; }
        public Guid CriteriaId { get; set; }
        //public FormCriteria? FormCriteria { get; set; }

    }
}
