export class DefaultRoles{
    public static readonly Admin: string = "Admin";
    public static readonly HR: string = "HR";
    public static readonly DevelopmentManager: string = "Development Manager";
    public static readonly HeadOfDepartment:string = "Head Of Department";
    public static readonly ProjectManager:string = "Project Manager";
    public static readonly TeamLead:string = "Team Lead";
    public static readonly Development:string = "Development Member";
    public static readonly AllRoles: string[] = [DefaultRoles.Admin, 
                                                DefaultRoles.HR,                                                  
                                                DefaultRoles.DevelopmentManager, 
                                                DefaultRoles.HeadOfDepartment,
                                                DefaultRoles.ProjectManager,
                                                DefaultRoles.TeamLead,
                                                DefaultRoles.Development];
}       