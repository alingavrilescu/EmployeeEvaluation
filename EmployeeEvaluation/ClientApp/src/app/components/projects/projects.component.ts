import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';
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
  });

  editProjectForm = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescription: new FormControl('', Validators.required),
  });

  constructor(private projectService:ProjectsService, private activatedRoute: ActivatedRoute) { }
  
  deleteSubscription!: Subscription;
  displayConfirmationDialogue: boolean = false; 
  getDepartmentsSubscription!:Subscription;
  refreshProjectsSubscription!:Subscription;
  addProjectSubscription!:Subscription;
  updateProjectSubscription!:Subscription;
  projectsList: Project[]=[];
  projectId:any;
  projectIdToDelete: any;
  departmentId:any;
  project!: Project;

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
  }

  addProject(){
    var newProject = new Project();
    newProject.name = this.addProjectForm.controls.projectName.value!;
    newProject.description= this.addProjectForm.controls.projectDescription.value!;
    newProject.departmentId=this.departmentId;
    this.projectService.createProject(newProject).subscribe(()=>{this.refreshProjectList();
    });
    this.hideAddDialog();
  }

  updateProject()
  {
    var project ={
      name:this.editProjectForm.controls.projectName.value!,
      description:this.editProjectForm.controls.projectDescription.value!
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
  // ======================= MODALS CONTROLS =====================================

  showAddDialog(){
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
    this.editProjectForm.controls.projectName.setValue(project.name);
    this.editProjectForm.controls.projectDescription.setValue(project.description);
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
