import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects!: Observable<Project[]>;
  deleteSubscription!: Subscription;

  constructor(private projectsService:ProjectsService) { 
  }

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }
  deleteProject(id: string)
  {
      this.deleteSubscription?.unsubscribe();
      this.deleteSubscription = this.projectsService.deleteProject(id)
                            .subscribe(()=>{
                              this.projects = this.projectsService.getProjects();
                            }, error=>{});
  }
}
