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

  editProjectFormGroup = new FormGroup({
    nameControl: new FormControl(''),
    descriptionControl: new FormControl(''),
  });

  constructor(private projectService:ProjectsService, private departmentService:DepartmentsService, 
    private formBuilder: FormBuilder) { }
  
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
    var temp={
      name:this.projectName,
      description:this.projectDescription,
      departmentId:this.department.id
    };
    this.addProjectSubscription=this.projectService.createProject(temp).subscribe(()=>{this.refreshProjectList();});
    this.projectName="";
    this.projectDescription="";
  }

  updateProject()
  {
    var project ={
      name:this.projectNameEdit,
      description:this.projectDescriptionEdit
    }
    this.updateProjectSubscription=this.projectService.updateProject(this.projectId, project).subscribe(()=>{this.refreshProjectList();});
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

  getData(project:Project)
  {
    if(project.id)
    {
      this.projectId=project.id;
    }
    this.projectNameEdit = project.name;
    this.projectDescriptionEdit = project.description;
  }
}
