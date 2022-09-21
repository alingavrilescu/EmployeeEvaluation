﻿using EmployeeEvaluation.DataAccess.Model;
using Microsoft.AspNetCore.Identity;

namespace EmployeeEvaluation.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser(string userName) : base(userName) { }

    }
}