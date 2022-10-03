import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, tap, toArray } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Department } from 'src/app/models/department.model';
import { FormTemplate } from 'src/app/models/form-template.model';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { FormTemplateService } from 'src/app/services/form-template.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-head-of-department-page',
  templateUrl: './head-of-department-page.component.html',
  styleUrls: ['./head-of-department-page.component.css'],
})


export class HeadOfDepartmentPageComponent implements OnInit {
  headOfDepartment!: UserDTO;
  departmentId!: Observable<string>; 
  department!: Observable<Department>; 
  formTemplates!: Observable<FormTemplate[]>;
  projects!: Observable<Project[]>;
  members!: Observable<UserDTO[]>;
 
  constructor(
    private authorizeService: AuthorizeService,
    private userService: UsersService,
    private departmentService: DepartmentsService,
    private formTemplatesService: FormTemplateService,
    private projectsService: ProjectsService
  ) {

    
  }

  ngOnInit() {   

    this.departmentId = this.authorizeService.getUserDepartmentId()
                            .pipe(tap((depId) => {                              
                                                  if (depId)
                                                  {
                                                    this.department = this.departmentService.getDepartmentById(Guid.parse(depId));
                                                    this.formTemplates = this.formTemplatesService
                                                                            .getFormTemplates(Guid.parse(depId));
                                                    this.projects = this.projectsService.getProjects()
                                                                                        .pipe(
                                                                                            map(projects => projects.filter(project=> project.departmentId == Guid.parse(depId)))
                                                                                          );
                                                    this.members = this.userService.getUsersOfDepartment(Guid.parse(depId));
                                                  }
                                                }
                                      )
                                );                                          
    
  }

  getVerifiedTemplates(templatesList: FormTemplate[] | null): FormTemplate[]
  {
    if (templatesList)
      return templatesList;

    return [];
  }

  getVerifiedMembers(membersList: UserDTO[]|null):UserDTO[]
  {
    if (membersList)
      return membersList;
    return [];
  }

  getVerifiedProjects(projectsList: Project[] | null):Project[]
  {
    if (projectsList)
      return projectsList;
    return [];
  }
}
