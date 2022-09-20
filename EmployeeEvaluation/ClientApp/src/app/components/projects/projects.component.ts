import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    projectName: new FormControl(''),
    projectDescription: new FormControl(''),
  });

  editProjectForm = new FormGroup({
    projectName: new FormControl(''),
    projectDescription: new FormControl(''),
  });

  constructor(private projectService:ProjectsService, private departmentService:DepartmentsService) { }
  
  deleteSubscription!: Subscription;
  getDepartmentsSubscription!:Subscription;
  refreshProjectsSubscription!:Subscription;
  addProjectSubscription!:Subscription;
  updateProjectSubscription!:Subscription;
  department!:Department;
  departmentsList:Department[]=[];
  projectsList: Project[]=[];
  projectId!:Guid;
  projectNameEdit = "";
  projectDescriptionEdit = "";
  projectName = "";
  projectDescription = "";
  project!: Project;

  displayAddModal: boolean = false;
  displayEditModal: boolean = false;

  
  ngOnInit(): void {
    this.refreshProjectList();
    this.getDepartments();
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
    // var temp={
    //   name:this.projectName,
    //   description:this.projectDescription,
    //   departmentId:this.department.id
    // };
    // this.addProjectSubscription=this.projectService.createProject(newProject).subscribe(()=>{this.refreshProjectList();});
    // this.projectName="";
    // this.projectDescription="";
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
  }

  refreshProjectList()
  {
    this.refreshProjectsSubscription=this.projectService.getProjects().subscribe(data=>{
      this.projectsList=data;
    })
  }

  getDepartments(){
    this.getDepartmentsSubscription=this.departmentService.getDepartments().subscribe((data)=>{
      this.departmentsList=data;
    })
  }

  // ======================= MODALS CONTROLS =====================================

  showAddDialog(){
    this.displayAddModal = this.displayAddModal=true;
  }

  hideAddDialog(){
    this.displayAddModal = this.displayAddModal=false;
  }
  
  showEditDialog(project:Project){
    this.displayEditModal = this.displayEditModal=true;
    if(project.id)
    {
      this.projectId=project.id;
    }
    this.editProjectForm.controls.projectName.setValue(project.name);
    this.editProjectForm.controls.projectDescription.setValue(project.description);
  }

  hideEditDialog()
  {
    this.displayEditModal = this.displayEditModal=false;
  }
}
