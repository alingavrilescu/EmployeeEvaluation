import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Department } from 'src/app/models/department.model';
import { Project } from 'src/app/models/project.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(private projectService:ProjectsService, private activatedRoute: ActivatedRoute, private departmentService:DepartmentsService) {

  }

  projectId:any;
  project!:Project;
  department!:Department;
  departments:Department[]=[];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.projectId=params.get('id');
    })
    this.getProject();
    this.getDepartments();
  }

  getProject(){
    this.projectService.getProjectById(this.projectId).subscribe((res)=>{
      this.project=res;
    })
  }

  updateProject(){
    this.project.departmentId=this.department.id;
    this.projectService.updateProject(this.projectId, this.project).subscribe({
      next: (response) =>{
        console.log(response);
      }
    })
  }

  getDepartments(){
    this.departmentService.getDepartments().subscribe((res)=>{
      this.departments=res;
    })
  }

}
