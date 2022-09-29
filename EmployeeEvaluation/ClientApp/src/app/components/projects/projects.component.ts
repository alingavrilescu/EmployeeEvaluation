import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDTO } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  addProjectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required),
    projectTeamLead:new FormControl('', Validators.required)
  });

  editProjectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required),
    projectTeamLead:new FormControl('', Validators.required),
    projectManager:new FormControl(''),
  });

  constructor(private projectService:ProjectsService, private activatedRoute: ActivatedRoute, private usersService:UsersService) { }
  
  deleteSubscription!: Subscription;
  displayConfirmationDialogue: boolean = false; 
  getDepartmentsSubscription!:Subscription;
  refreshProjectsSubscription!:Subscription;
  addProjectSubscription!:Subscription;
  updateProjectSubscription!:Subscription;
  getPMsSubscription!:Subscription;
  getCurrentPMSubscription!:Subscription;
  projectsList: Project[]=[];
  projectId:any;
  projectIdToDelete: any;
  departmentId:any;
  project!: Project;
  projectManagers:UserDTO[]=[];
  projectTeamLeads:UserDTO[]=[];
  currentProjectManager!:UserDTO;
  projectManagerName!:Observable<string>;

  displayAddModal: boolean = false;
  displayEditModal: boolean = false;

  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.departmentId=params.get('depId');
    })
    this.refreshProjectList();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
    this.getDepartmentsSubscription?.unsubscribe();
    this.refreshProjectsSubscription?.unsubscribe();
    this.addProjectSubscription?.unsubscribe();
    this.updateProjectSubscription?.unsubscribe();
    this.getPMsSubscription?.unsubscribe();
    this.getCurrentPMSubscription?.unsubscribe();
  }

  addProject(){
    var newProject = new Project();
    newProject.name = this.addProjectForm.controls.projectName.value!;
    newProject.description= this.addProjectForm.controls.projectDescription.value!;
    newProject.departmentId=this.departmentId;
    newProject.teamLeadId=this.addProjectForm.controls.projectTeamLead.value!;
    this.projectService.createProject(newProject).subscribe(()=>{this.refreshProjectList();
    });
    this.hideAddDialog();
  }

  updateProject()
  {
    var project ={
      name:this.editProjectForm.controls.projectName.value!,
      description:this.editProjectForm.controls.projectDescription.value!,
      projectManagerId:this.editProjectForm.controls.projectManager.value!,
      TeamLeadId:this.editProjectForm.controls.projectTeamLead.value!
    }
    this.updateProjectSubscription=this.projectService.updateProject(this.projectId, project).subscribe(()=>{this.refreshProjectList();});
    this.hideEditDialog();
  }
  
  deleteProject(id?: Guid)
  {
    if(id!==undefined) 
    {
      this.deleteSubscription=this.projectService.deleteProject(id).subscribe(()=>{this.refreshProjectList();});
    }
    this.hideDeleteDialog();
  }

  refreshProjectList()
  {
    this.refreshProjectsSubscription=this.projectService.getProjects().subscribe(data=>{
      this.projectsList=data;
    })
  }

  getPMs(){
    this.getPMsSubscription=this.usersService.getPMWithoutProj(this.departmentId, this.projectId).subscribe(data=>{
      this.projectManagers=data;
    })
  }
  getTLs(){
    this.getPMsSubscription=this.usersService.getTLWithoutProj(this.departmentId).subscribe(data=>{
      this.projectTeamLeads=data;
    })
  }
  getTLsForEdit(){
    this.getPMsSubscription=this.usersService.getTLForEdit(this.departmentId, this.projectId).subscribe(data=>{
      this.projectTeamLeads=data;
    })
  }
  // getCurrentPM(id?:string)
  // {
  //   if(id)
  //     this.projectManagerName=this.projectManagers.find((user) => user.name === name);
  // }
  // ======================= MODALS CONTROLS =====================================

  showAddDialog(){
    this.getTLs();
    this.displayAddModal = true;
  }

  hideAddDialog(){
    this.displayAddModal = false;
  }
  
  showEditDialog(project:Project){
    this.displayEditModal = true;
    if(project.id)
    {
      this.projectId=project.id;
    }
    this.getTLsForEdit();
    this.getPMs();
    this.editProjectForm.controls.projectName.setValue(project.name);
    this.editProjectForm.controls.projectDescription.setValue(project.description);
    this.editProjectForm.controls.projectManager.setValue(project.projectManagerId!);
    this.editProjectForm.controls.projectTeamLead.setValue(project.teamLeadId!);
  }

  hideEditDialog()
  {
    this.displayEditModal = false;
  }

  showDeleteDialog(project: Project) {
    this.displayConfirmationDialogue = true;
    if(project.id){
      this.projectIdToDelete = project.id;
    }
  }

  hideDeleteDialog(){
    this.displayConfirmationDialogue = false;
  }
}
