import { Component, OnInit,OnDestroy } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  deleteSubscription!: Subscription;

  constructor(private projectService:ProjectsService) { 
  }

  projectsList: Project[]=[];
  projectName = "";
  projectDescription = "";
  
  ngOnInit(): void {
    this.refreshProjectList();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
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
}
