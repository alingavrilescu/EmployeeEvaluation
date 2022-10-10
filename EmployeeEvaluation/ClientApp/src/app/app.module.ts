import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectsService } from './services/projects.service';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { DepartmentTableComponent } from './components/department/department-table/department-table/department-table.component';
import { DialogModule } from 'primeng/dialog';
import { FormTemplateComponent } from './components/form-template/form-template.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProjectDetailsComponent } from './components/projects/projectDetails/project-details/project-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form/evaluation-form.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ListboxModule } from 'primeng/listbox';
import { HeadOfDepartmentPageComponent } from './components/head-of-department-page/head-of-department-page.component';
import { DefaultRoles } from 'src/api-authorization/role-defines';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ProjectLeadsComponent } from './components/department-details/project-leads/project-leads.component';
import { ProjectManagersComponent } from './components/department-details/project-managers/project-managers.component';
import { DevelopersComponent } from './components/department-details/developers/developers.component';
import { FormTemplateDetailsComponent } from './components/form-template/form-template-details/form-template-details/form-template-details.component';
import { CriteriaDetailsComponent } from './components/evaluation-form/evaluation-form/criteria-details/criteria-details/criteria-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProjectsComponent,
    UsersTableComponent,
    DepartmentTableComponent,
    FormTemplateComponent,
    ProjectDetailsComponent,
    UserDetailsComponent,
    CriteriaDetailsComponent,
    EvaluationFormComponent,
    DepartmentDetailsComponent,
    HeadOfDepartmentPageComponent,
    ProjectLeadsComponent,
    ProjectManagersComponent,
    DevelopersComponent,
    FormTemplateDetailsComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    CardModule,
    FormsModule,
    TabViewModule,
    AccordionModule,
    DropdownModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    DataViewModule,
    DropdownModule,
    InputTextareaModule,
    ToastModule,
    RippleModule,
    InputTextModule,
    ListboxModule,
    RadioButtonModule,
    TableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'departments', component: DepartmentTableComponent, canActivate:[AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.DevelopmentManager]
        }
      },
      { path: 'departments/details/project-leads/:id', component: ProjectLeadsComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.DevelopmentManager]
        }
      },
      { path: 'departments/details/project-managers/:id', component: ProjectManagersComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.DevelopmentManager]
        }
      },
      { path: 'departments/details/developers/:id', component: DevelopersComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.DevelopmentManager]
        }
      },
      { path: 'departments/details/:id', component: DepartmentDetailsComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.DevelopmentManager, DefaultRoles.HeadOfDepartment]
        }
      },
      { path: 'departments/:depId/projects', component: ProjectsComponent, canActivate:[AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.HeadOfDepartment, DefaultRoles.DevelopmentManager]
        }
      },
      { path: 'departments/:depId/projects/:proId', component: ProjectDetailsComponent, canActivate:[AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.ProjectManager, DefaultRoles.TeamLead , DefaultRoles.DevelopmentManager, DefaultRoles.HeadOfDepartment],
        }
      },
      { path: 'departments/:id/form-templates', component: FormTemplateComponent, canActivate:[AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.HeadOfDepartment, DefaultRoles.DevelopmentManager]
        }
      },
      { path: 'departments/:id/form-templates/:ftId',component: FormTemplateDetailsComponent, canActivate:[AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.HeadOfDepartment, DefaultRoles.DevelopmentManager]
        }
      },
      { path: 'users', component: UsersTableComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.HR]
        }
      },
      { path: 'users/userDetails/:id', component: UserDetailsComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.HeadOfDepartment, DefaultRoles.DevelopmentManager, DefaultRoles.ProjectManager, DefaultRoles.TeamLead, DefaultRoles.Development]
        }
      },  
      { path: 'users/userDetails/:userId/evaluation-form/:id', component: EvaluationFormComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.HeadOfDepartment, DefaultRoles.DevelopmentManager, DefaultRoles.ProjectManager, DefaultRoles.TeamLead, DefaultRoles.Development]
        }
      }, 
      { path: 'users/userDetails/:userId/evaluation-form/:id/criteria-details/:criteriaId', component: CriteriaDetailsComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.Admin, DefaultRoles.HeadOfDepartment, DefaultRoles.DevelopmentManager, DefaultRoles.ProjectManager, DefaultRoles.TeamLead, DefaultRoles.Development]
        }
      }, 
      { path: 'head-of-department', component: HeadOfDepartmentPageComponent, canActivate: [AuthorizeGuard],
        data: {
          roles: [DefaultRoles.HeadOfDepartment]
        }
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    ProjectsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
