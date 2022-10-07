import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { async, from, of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { DefaultRoles } from 'src/api-authorization/role-defines';
import { UserDTO } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  
  isTeamLead$: Observable<boolean>;
  isProjectManager$:Observable<boolean>;
  isDevManager$: Observable<boolean>;
  isHeadOfDept$: Observable<boolean>;
  isDeveloper$: Observable<boolean>;
  isHR$:Observable<boolean>;
  connectedUserId!:Observable<string|null>;
  projectId?:Guid;
  departmentId?:Guid;
  loggedUserId!:string;
  loggedUser!:Observable<UserDTO>;

  getUserSubscription!:Subscription;

  role$: Observable<string | null>;

  constructor(private authService: AuthorizeService, private usersService : UsersService, private router:Router)
  {
    this.isTeamLead$ = this.authService.isUserTeamLead();
    this.isDevManager$ = this.authService.isUserDevelopmentManager();    
    this.isHeadOfDept$ = this.authService.isUserHeadOfDepartment();
    this.isDeveloper$=this.authService.isUserDevMember();
    this.isHR$=this.authService.isUserHR();
    this.isProjectManager$=this.authService.isUserProjManager();
    this.role$ = this.authService.getRole();
    
  }
  
  ngOnInit(): void {
    this.connectedUserId = this.authService.getUserId()
    .pipe(tap((userId)=>
         {
           if(userId){
            this.loggedUser=this.usersService.getUserById(Guid.parse(userId)).pipe(tap((user)=>{
              this.projectId=user.projectId;
              this.departmentId=user.departmentId;
            }));
            this.loggedUserId=userId;
           }
           console.log(userId);
         }));
    
  }

  redirectUser(user:UserDTO | null)
  {
    if(user){
      switch(user.role)
      {
        case DefaultRoles.Admin:
          this.router.navigate([`users`]);
          break;
        case DefaultRoles.HR:
          this.router.navigate([`users`]);
          break;
        case DefaultRoles.DevelopmentManager:
          this.router.navigate([`departments`]);
          break;
        case DefaultRoles.HeadOfDepartment:
          this.router.navigate([`head-of-department`]);
          break;
        case DefaultRoles.ProjectManager:
          this.router.navigate([`departments/${this.departmentId}/projects/${this.projectId}`]);
          break;
        case DefaultRoles.TeamLead:
          this.router.navigate([`departments/${this.departmentId}/projects/${this.projectId}`]);
          break;
        case DefaultRoles.Development:
          this.router.navigate([`users/userDetails/${this.loggedUserId}`]);
          break;
        default:
          this.router.navigate([``]);
          break;
      }
    }
  }

  ngOnDestroy(): void {
    this.getUserSubscription?.unsubscribe();
  }

}
