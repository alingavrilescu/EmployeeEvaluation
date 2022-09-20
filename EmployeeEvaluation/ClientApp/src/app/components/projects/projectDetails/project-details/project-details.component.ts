import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subscribable, Subscription } from 'rxjs';
import { Department } from 'src/app/models/department.model';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  constructor(private projectService:ProjectsService, private activatedRoute: ActivatedRoute, private userService: UsersService) { }

  projectId:any;
  project!:Project;
  usersList:UserDTO[] = [];
  getProjectSubscription!:Subscription;
  getDepartmentsSubscription!:Subscription;
  getUsersOfProjectSubscription!:Subscription;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId=params.get('id');
    })
    this.getProject();
    // this.getUsersOfProject();
  }

  ngOnDestroy(): void{
    this.getProjectSubscription?.unsubscribe();
    this.getUsersOfProjectSubscription?.unsubscribe();
  }

  getProject(){
    this.getProjectSubscription=this.projectService.getProjectById(this.projectId).subscribe((res)=>{
      this.project=res;
      this.getUsersOfProjectSubscription = this.userService.getUsersOfProject(this.projectId).subscribe(data => {
        this.usersList = data;
      });
    });
  }
  
  // getUsersOfProject(){
  //   this.getUsersOfProjectSubscription = this.userService.getUsersOfProject(this.projectId).subscribe(data => {
  //     this.usersList = data;
  //   });
  // }

}
