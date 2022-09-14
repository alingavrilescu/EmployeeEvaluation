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

  constructor(private projectService:ProjectsService, private departmentService:DepartmentsService) { }
  
  deleteSubscription!: Subscription;
  getDepartmentsSubscription!:Subscription;
  departmentsList:Department[]=[];
  projectsList: Project[]=[];
  projectName = "";
  projectDescription = "";

  
  ngOnInit(): void {
    this.refreshProjectList();
    this.getDepartments();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
    this.getDepartmentsSubscription.unsubscribe();
  }

  addProject(){
    var temp={
      name:this.projectName,
      description:this.projectDescription
    };
    this.projectService.createProject(temp).subscribe(()=>{this.refreshProjectList();});
  }

  updateProject(project:Project, id: Guid)
  {
    this.projectService.updateProject(id, project).subscribe(res => {alert(res.toString());
    });
    this.refreshProjectList();
  }
  
  deleteProject(id?: Guid)
  {
    if(id!==undefined) 
    {
      this.projectService.deleteProject(id).subscribe(()=>{this.refreshProjectList();});
    }
  }

  refreshProjectList()
  {
    this.projectService.getProjects().subscribe(data=>{
      this.projectsList=data;
    })
  }

  getDepartments(){
    this.getDepartmentsSubscription=this.departmentService.getDepartments().subscribe((data)=>{
      this.departmentsList=data;
    })
  }
}
