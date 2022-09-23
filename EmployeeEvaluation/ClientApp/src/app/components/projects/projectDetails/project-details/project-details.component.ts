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
  departmentId:any;
  userToRemoveId:any;
  project!:Project;
  usersList:UserDTO[] = [];
  usersWithoutProject:UserDTO[] = [];
  selectedUsers:UserDTO[] = [];
  selectedUsersIds:Guid[]=[];
  disabledSubmit:boolean=true;
  getProjectSubscription!:Subscription;
  getDepartmentsSubscription!:Subscription;
  getUsersOfProjectSubscription!:Subscription;
  getUsersWithoutProjectSubscription!:Subscription;
  addUsersToProjectSubscription!:Subscription;
  removeUsersFromProjectSubscription!:Subscription;


  displayAddUsersModal:Boolean=false;
  displayConfirmationDialogue:boolean=false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId=params.get('proId');
      this.departmentId=params.get('depId');
    })
    this.getProject();
  }

  ngOnDestroy(): void{
    this.getProjectSubscription?.unsubscribe();
    this.getUsersOfProjectSubscription?.unsubscribe();
    this.getUsersWithoutProjectSubscription?.unsubscribe();
    this.addUsersToProjectSubscription?.unsubscribe();
    this.removeUsersFromProjectSubscription?.unsubscribe();
  }

  getProject(){
    this.getProjectSubscription=this.projectService.getProjectById(this.projectId).subscribe((res)=>{
      this.project=res;
      this.getUsersOfProject();
    });
  }

  getUsersOfProject(){
    this.getUsersOfProjectSubscription = this.userService.getUsersOfProject(this.projectId).subscribe(data => {
      this.usersList = data;
    });
  }

  onListActions(event:any)
  {
    if(event.value.length===0)
    {
      this.disabledSubmit=true;
    }
    else
    {
      this.disabledSubmit=false;
    }
    this.selectedUsersIds=event.value;
  }

  addUsersToProject(){
    this.addUsersToProjectSubscription=this.projectService.addUsersToProject(this.projectId, this.selectedUsersIds).subscribe(()=>{
      this.hideAddDialog();
      this.getUsersOfProject();
    })
  }

  getUsersWithoutProject()
  {
    this.getUsersWithoutProjectSubscription=this.userService.getUsersWithoutProject(this.departmentId).subscribe(data =>{
      this.usersWithoutProject=data;
    })
  }

  showAddDialog(){
    this.getUsersWithoutProject();
    this.displayAddUsersModal = true;
    this.disabledSubmit=true;
  }

  hideAddDialog(){
    this.displayAddUsersModal = false;
  }

  removeUser(){
    this.removeUsersFromProjectSubscription=this.projectService.removeUserFromProject(this.projectId,this.userToRemoveId).subscribe(()=>{
      this.hideDeleteConfirmation();
      this.getUsersOfProject();
    })
  }
  
  showDeleteConfirmation(id:Guid){
    this.userToRemoveId=id;
    this.displayConfirmationDialogue=true;
  }

  hideDeleteConfirmation(){
    this.displayConfirmationDialogue=false;
  }
}
