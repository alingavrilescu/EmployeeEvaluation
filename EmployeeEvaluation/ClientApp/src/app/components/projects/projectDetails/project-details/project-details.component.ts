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

  editProjectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required),
    projectTeamLead:new FormControl('', Validators.required),
    projectManager:new FormControl(''),
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
  projectManagers:UserDTO[]=[];
  projectTeamLeads:UserDTO[]=[];

  getProjectSubscription!:Subscription;
  getDepartmentsSubscription!:Subscription;
  getUsersOfProjectSubscription!:Subscription;
  getUsersWithoutProjectSubscription!:Subscription;
  addUsersToProjectSubscription!:Subscription;
  removeUsersFromProjectSubscription!:Subscription;
  updateProjectSubscription!:Subscription;
  getPMsSubscription!:Subscription;
  getTlsSubscription!:Subscription;

  displayAddUsersModal:Boolean=false;
  displayConfirmationDialogue:boolean=false;
  displayEditModal: boolean = false;

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
    this.updateProjectSubscription?.unsubscribe();
    this.getPMsSubscription?.unsubscribe();
    this.getTlsSubscription?.unsubscribe();
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

  removeUser(){
    this.removeUsersFromProjectSubscription=this.projectService.removeUserFromProject(this.projectId,this.userToRemoveId).subscribe(()=>{
      this.hideDeleteConfirmation();
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
  
  getEventValue($event: any): string {
    return $event.target.value;
  }
  
  showDeleteConfirmation(id:Guid){
    this.userToRemoveId=id;
    this.displayConfirmationDialogue=true;
  }

  hideDeleteConfirmation(){
    this.displayConfirmationDialogue=false;
  }

  showEditDialog(){
    this.getPMs();
    this.getTLsForEdit();
    this.displayEditModal = true;
    this.editProjectForm.controls.projectName.setValue(this.project.name);
    this.editProjectForm.controls.projectDescription.setValue(this.project.description);
    this.editProjectForm.controls.projectManager.setValue(this.project.projectManagerId!);
    this.editProjectForm.controls.projectTeamLead.setValue(this.project.teamLeadId!);
  }

  hideEditDialog()
  {
    this.displayEditModal = false;
  }

  updateProject()
  {
    var project ={
      name:this.editProjectForm.controls.projectName.value!,
      description:this.editProjectForm.controls.projectDescription.value!,
      projectManagerId:this.editProjectForm.controls.projectManager.value!,
      TeamLeadId:this.editProjectForm.controls.projectTeamLead.value!
    }
    this.updateProjectSubscription=this.projectService.updateProject(this.projectId, project).subscribe(()=>{this.getProject();});
    this.hideEditDialog();
  }

  getPMs(){
    this.getPMsSubscription=this.userService.getPMWithoutProj(this.departmentId, this.projectId).subscribe(data=>{
      this.projectManagers=data;
    })
  }

  getTLsForEdit(){
    this.getPMsSubscription=this.userService.getTLForEdit(this.departmentId, this.projectId).subscribe(data=>{
      this.projectTeamLeads=data;
    })
  }
}
