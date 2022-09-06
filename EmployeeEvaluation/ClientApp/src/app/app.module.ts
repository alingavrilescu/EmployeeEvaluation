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
import { UsersButtonsComponent } from './components/users/users-buttons/users-buttons.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { DepartmentTableComponent } from './components/department/department-table/department-table/department-table.component';
import { DepartmentButtonsComponent } from './components/department/department-buttons/department-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProjectsComponent,
    UsersButtonsComponent,
    UsersTableComponent,
    DepartmentTableComponent,
    DepartmentButtonsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule.forRoot([
      { path: 'projects', component: ProjectsComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'users', component: UsersTableComponent },
      { path: 'departments', component: DepartmentTableComponent },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    ProjectsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
