using EmployeeEvaluation.AggregationServices;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Identity;

namespace EmployeeEvaluation.IdentityDataSeed
{
    public class IdentityDataSeeding
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UsersAggregationService userAggregationService;
        UserManager<ApplicationUser> userManager;
        private readonly ILogger<IdentityDataSeeding> logger;       
        private const string defaultPassword = "P@ssw0rd";
        public const string defaultAdminName = "System Admin";
        private readonly List<string> defaultRoles = new()
        {
            DefaultRoles.Admin,
            DefaultRoles.HR,
            DefaultRoles.DevelopmentManager,
            DefaultRoles.HeadOfDepartment,
            DefaultRoles.ProjectManager,
            DefaultRoles.TeamLead,
            DefaultRoles.Development
        };
        private readonly string defaultAdmin = "admin@admin.com";
        public IdentityDataSeeding(RoleManager<IdentityRole> roleManager, 
                                    UserManager<ApplicationUser> userManager,
                                   UsersAggregationService userAggregationService,
                                   ILogger<IdentityDataSeeding> logger)
        { 
            this.roleManager = roleManager;
            this.userAggregationService = userAggregationService;
            this.logger = logger;
            this.userManager = userManager;
        }

        private async Task SeedRoles()
        {
            foreach (var role in defaultRoles)
            {
                var roleExists = await roleManager.RoleExistsAsync(role);
                if (!roleExists)
                {
                    logger.LogDebug($"Seeding role: {role}");
                    var result = await roleManager.CreateAsync(new IdentityRole(role));
                    if (!result.Succeeded)
                    {
                        logger.LogError("Failed to seed role {role}. Errors: {@Errors}", role, result.Errors);
                    }
                }
            }
        }
        private async Task SeedDefaultUser()
        {

            var user = await userManager.FindByNameAsync(defaultAdmin);
            if (user != null)
            {
                logger.LogInformation("Default User already exists and it will not be created");
                return;
            }
            if (user == null)
            {
                await userAggregationService.CreateUser(new UserDTO()
                {
                    Role = DefaultRoles.Admin,
                    Email = defaultAdmin,
                    Name = defaultAdminName
                    
                }, defaultPassword);
            }      

           
        }
        public async Task SeedData()
        {
            await SeedRoles();
            await SeedDefaultUser();
        }
        
    }
}
