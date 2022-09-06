import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  addUserFormGroup = new FormGroup({
    nameControl: new FormControl(''),
    emailControl: new FormControl(''),
    roleControl: new FormControl(''),
  });
  users: UserDTO[] = [];
  projects: Project[] = [];
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.httpGetUsers();
  }
  httpGetProjects() {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  httpGetUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  httpDeleteUser(id: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) this.users.splice(i, 1);
    }
    this.usersService.deleteUser(id).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  httpEditUser(id: string, user: UserDTO) {
    user.name = this.addUserFormGroup.controls.nameControl.value!;
    user.email = this.addUserFormGroup.controls.emailControl.value!;
    user.role = this.addUserFormGroup.controls.roleControl.value!;
    this.usersService.editUser(id, user).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  refreshUsers(users: UserDTO[]) {
    this.users = users;
  }

  refreshProjects(projects: Project[]) {
    this.projects = projects;
  }
}
