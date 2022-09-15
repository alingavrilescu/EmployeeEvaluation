import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
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
  editUserFormGroup = new FormGroup({
    nameControl: new FormControl(''),
    emailControl: new FormControl(''),
    roleControl: new FormControl(''),
  });
  addUserFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    roleControl: new FormControl('', [Validators.required]),
  });
  users: UserDTO[] = [];
  user!: UserDTO;
  projects: Project[] = [];
  currentUserId!: Guid;
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
  setCurrentUserId(id: Guid) {
    this.currentUserId = id;
  }
  httpGetUserById(id?: Guid) {
    if (id !== undefined) {
      this.usersService.getUserById(id).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  httpAddUser() {
    var newUser = new UserDTO();
    newUser.name = this.addUserFormGroup.controls.nameControl.value!;
    newUser.email = this.addUserFormGroup.controls.emailControl.value!;
    newUser.role = this.addUserFormGroup.controls.roleControl.value!;
    this.usersService.addUser(newUser).subscribe({
      next: (user) => {
        this.httpGetUsers();
        alert('Account successfuly created!');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  httpDeleteUser(id?: Guid) {
    if (id !== undefined) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == id) this.users.splice(i, 1);
      }
      this.usersService.deleteUser(id).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    }
  }

  httpEditUser() {
    this.user.name = this.editUserFormGroup.controls.nameControl.value!;
    this.user.email = this.editUserFormGroup.controls.emailControl.value!;
    this.user.role = this.editUserFormGroup.controls.roleControl.value!;
    this.usersService.editUser(this.user.id!, this.user).subscribe({
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
