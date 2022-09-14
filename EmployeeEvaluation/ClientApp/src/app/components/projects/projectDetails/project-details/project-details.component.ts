import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subscribable, Subscription } from 'rxjs';
import { Department } from 'src/app/models/department.model';
import { Project } from 'src/app/models/project.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  constructor(private projectService:ProjectsService, private activatedRoute: ActivatedRoute, private departmentService:DepartmentsService) {

  }

  projectId:any;
  project!:Project;
  department!:Department;
  departments:Department[]=[];
  // departmentToDisplay!:Department;
  getProjecSubscription!:Subscription;
  // getAssignedDepartmentSubscription!:Subscription;
  getDepartmentsSubscription!:Subscription;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId=params.get('id');
    })
    this.getProject();
  }

  ngOnDestroy(): void{
    this.getProjecSubscription?.unsubscribe();
    // this.getAssignedDepartmentSubscription?.unsubscribe();
    this.getDepartmentsSubscription?.unsubscribe();
  }

  getProject(){
    this.getProjecSubscription=this.projectService.getProjectById(this.projectId).subscribe((res)=>{
      this.project=res;     
      // if(this.project && this.project.departmentId){
      //   this.getAssignedDepartmentSubscription=this.departmentService.getDepartmentById(this.project.departmentId).subscribe((res)=>{
      //     this.departmentToDisplay=res;
      //   })
      // }
    });
  }
  
  // updateProjectDepartment(){
  //   console.log(this.department.id);
  //   this.project.departmentId=this.department.id;
  //   if(this.project.id){
  //     this.projectService.updateProject(this.project.id, this.project).subscribe({
  //       next: (response) =>{
  //         console.log(response);
  //       }
  //     })
  //   }
  // }
}
