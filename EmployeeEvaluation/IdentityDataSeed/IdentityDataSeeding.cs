using EmployeeEvaluation.AggregationServices;
using EmployeeEvaluation.Models;
using Microsoft.AspNetCore.Identity;

namespace EmployeeEvaluation.IdentityDataSeed
{
    public class IdentityDataSeeding
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UsersAggregationService userAggregationService;
        private readonly ILogger<IdentityDataSeeding> logger;
        private const string AdminRole = "Admin";
        private const string defaultPassword = "P@ssw0rd";
        private readonly List<string> defaultRoles = new()
        {
            AdminRole,
            "HR",
            "Development Manager",
            "Head Of Department",
            "Project Manager",
            "Team Lead",
            "Software Developer"
        };
        private readonly string defaultAdmin = "admin@admin.com";
        public IdentityDataSeeding(RoleManager<IdentityRole> roleManager, 
                                   UsersAggregationService userAggregationService,
                                   ILogger<IdentityDataSeeding> logger)
        { 
            this.roleManager = roleManager;
            this.userAggregationService = userAggregationService;
            this.logger = logger;
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
           
          /*  var user = await userManager.FindByNameAsync(defaultAdmin);
            if (user == null)
            {
                logger.LogDebug("Seeding user to store");
                var adminUser = new ApplicationUser(defaultAdmin);
                var result = await userManager.CreateAsync(adminUser, defaultPassword);
                if (result == IdentityResult.Success)
                {
                    logger.LogDebug("User created. Assigning to its role");
                    user = await userManager.FindByNameAsync(defaultAdmin);
                    result = await userManager.AddToRoleAsync(user, AdminRole);
                    if (result != IdentityResult.Success)
                    {
                        logger.LogError($"Failed to add default admin user to its role");
                    }
                }
            }
            else
            {
                logger.LogDebug("Default admin user already exists. Not seeding the user");
            }
          */
        }
        public async Task SeedData()
        {
            await SeedRoles();
            await SeedDefaultUser();
        }
        
    }
}
