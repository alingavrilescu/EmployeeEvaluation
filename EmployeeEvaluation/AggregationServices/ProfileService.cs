using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using EmployeeEvaluation.ApplicationLogic;
using EmployeeEvaluation.Models;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace EmployeeEvaluation.AggregationServices
{
    public class ProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory;
        private readonly UserManager<ApplicationUser> userMgr;
        private readonly RoleManager<IdentityRole> roleMgr;
        private readonly UserService usersService;
        private const string DepartmentClaimName = "department";
        public ProfileService(
            UserManager<ApplicationUser> userMgr,
            RoleManager<IdentityRole> roleMgr,
            IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
            UserService usersService)
        {
            this.userMgr = userMgr;
            this.roleMgr = roleMgr;
            this.userClaimsPrincipalFactory = userClaimsPrincipalFactory;
            this.usersService = usersService;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            string sub = context.Subject.GetSubjectId();
            ApplicationUser user = await userMgr.FindByIdAsync(sub);            
            ClaimsPrincipal userClaims = await userClaimsPrincipalFactory.CreateAsync(user);

            List<Claim> claims = userClaims.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();
            var appUser = usersService.GetUserById(Guid.Parse(sub));
            
            if (userMgr.SupportsUserRole)
            {
                IList<string> roles = await userMgr.GetRolesAsync(user);
                foreach (var roleName in roles)
                {
                    claims.Add(new Claim(JwtClaimTypes.Role, roleName));
                    if (roleMgr.SupportsRoleClaims)
                    {
                        IdentityRole role = await roleMgr.FindByNameAsync(roleName);
                        if (role != null)
                        {
                            claims.AddRange(await roleMgr.GetClaimsAsync(role));
                        }
                    }
                }
            }
            if (appUser != null && appUser.DepartmentId != null)
            {
                var departmentId = appUser.DepartmentId?.ToString();
                if (!string.IsNullOrEmpty(departmentId))
                {
                    claims.Add(new Claim(DepartmentClaimName, departmentId));
                }
            }
            else
            {
                claims.Add(new Claim(DepartmentClaimName, ""));
            }

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            string sub = context.Subject.GetSubjectId();
            ApplicationUser user = await userMgr.FindByIdAsync(sub);
            context.IsActive = user != null;
        }
    }
}
