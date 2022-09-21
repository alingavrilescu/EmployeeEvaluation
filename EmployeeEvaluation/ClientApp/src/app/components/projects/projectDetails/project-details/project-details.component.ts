import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  addUsersToProjectForm = new FormGroup({
    users: new FormControl('', Validators.required)
  });

  constructor(private projectService:ProjectsService, private activatedRoute: ActivatedRoute, private userService: UsersService) { }

  projectId:any;
  project!:Project;
  usersList:UserDTO[] = [];
  usersWithoutProject:UserDTO[] = [];
  getProjectSubscription!:Subscription;
  getDepartmentsSubscription!:Subscription;
  getUsersOfProjectSubscription!:Subscription;
  getUsersWithoutProjectSubscription!:Subscription;

  displayAddUsersModal:Boolean=false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId=params.get('id');
    })
    this.getProject();
  }

  ngOnDestroy(): void{
    this.getProjectSubscription?.unsubscribe();
    this.getUsersOfProjectSubscription?.unsubscribe();
    this.getUsersWithoutProjectSubscription?.unsubscribe();
  }

  getProject(){
    this.getProjectSubscription=this.projectService.getProjectById(this.projectId).subscribe((res)=>{
      this.project=res;
      this.getUsersOfProjectSubscription = this.userService.getUsersOfProject(this.projectId).subscribe(data => {
        this.usersList = data;
      });
    });
  }

  // getUsersWithoutProject()
  // {
  //   this.getUsersWithoutProjectSubscription=this.userService.getUsersWithoutProject(departmentId).subscribe(data =>{
  //     this.usersWithoutProject=data;
  //   })
  // }

  showAddDialog(){
    this.displayAddUsersModal = true;
  }

  hideAddDialog(){
    this.displayAddUsersModal = false;
  }

}
