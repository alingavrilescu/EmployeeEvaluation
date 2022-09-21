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
import { DepartmentButtonsComponent } from './components/department/department-buttons/department-buttons.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProjectsComponent,
    UsersTableComponent,
    DepartmentTableComponent,
    DepartmentButtonsComponent,
    FormTemplateComponent,
    ProjectDetailsComponent,
    UserDetailsComponent,
    EvaluationFormComponent,
    DepartmentDetailsComponent,
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
    TableModule,
    RouterModule.forRoot([
      { path: 'departments/:id/projects', component: ProjectsComponent },
      {
        path: 'projects/projectDetails/:id',
        component: ProjectDetailsComponent,
      },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'users', component: UsersTableComponent },
      { path: 'departments', component: DepartmentTableComponent },
      { path: 'form-templates', component: FormTemplateComponent },
      { path: 'users/userDetails/:id', component: UserDetailsComponent },
      { path: 'evaluation-form/user/:id', component: EvaluationFormComponent },
      {
        path: 'departments/details/:id',
        component: DepartmentDetailsComponent,
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    ProjectsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
