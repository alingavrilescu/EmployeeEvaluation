import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
})
export class DepartmentDetailsComponent implements OnInit {
  projects: Project[] = [];
  users: UserDTO[] = [];
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data;
    });
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
