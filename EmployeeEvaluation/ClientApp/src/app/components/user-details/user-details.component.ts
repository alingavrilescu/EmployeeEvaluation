import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: any;
  user!: UserDTO;
  project!: Project;
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private departmentsService: DepartmentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.usersService.getUserById(this.userId).subscribe((res) => {
      this.user = res;
    });
    this.projectsService
      .getProjectById(this.user.projectId!)
      .subscribe((res) => {
        this.project = res;
      });
  }
}
