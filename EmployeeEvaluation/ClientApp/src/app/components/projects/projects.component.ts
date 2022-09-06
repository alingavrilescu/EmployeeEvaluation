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

  projectsList: Project[]=[];
  projectName = "";
  projectDescription = "";
  display = "none";
  displayModal: boolean = false;

  displayBasic: boolean = false;

  displayBasic2: boolean = false;

  displayMaximizable: boolean = false;

  displayPosition: boolean = false;

  position: string = "";

  addProject(){
    var temp={
      name:this.projectName,
      description:this.projectDescription
    };

    this.projectsService.createProject(temp).subscribe(res => {alert(res.toString());
    });
    this.display = "none";
    window.location.reload();

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

  openModal(){
    this.display = "block";
  }
  onCloseModal(){
    this.display = "none";
  }
  showModalDialog() {
    this.displayModal = true;
}

  showBasicDialog() {
      this.displayBasic = true;
  }

  showBasicDialog2() {
      this.displayBasic2 = true;
  }

  showMaximizableDialog() {
      this.displayMaximizable = true;
  }

  showPositionDialog(position: string) {
      this.position = position;
      this.displayPosition = true;
  }

}
