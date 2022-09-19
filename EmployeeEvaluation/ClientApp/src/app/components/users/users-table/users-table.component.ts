import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  editUserFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    roleControl: new FormControl(''),
  });
  addUserFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    roleControl: new FormControl(''),
  });
  users: UserDTO[] = [];
  user!: UserDTO;
  roles = [
    'Human Resources',
    'Software Developer',
    'Project Manager',
    'Project Lead',
    'Head of Department',
    'Director of Department',
  ];
  projects: Project[] = [];
  currentUserId!: Guid;
  loading: boolean = true;
  displayAddModal: boolean = false;
  displayEditModal: boolean = false;
  displayDeleteModal: boolean = false;
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.httpGetUsers();
  }
  clear(table: Table) {
    table.clear();
  }
  showAddDialog() {
    this.displayAddModal = !this.displayAddModal;
  }
  showEditDialog() {
    this.displayEditModal = !this.displayEditModal;
  }
  showDeleteDialog() {
    this.displayDeleteModal = !this.displayDeleteModal;
  }
  getEventValue($event: any) {
    return $event.target.value;
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
        this.loading = false;
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
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  httpDeleteUser() {
    if (this.currentUserId !== undefined) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == this.currentUserId) this.users.splice(i, 1);
      }
      this.usersService.deleteUser(this.currentUserId).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    }
  }

  httpEditUser() {
    if (this.currentUserId !== undefined) {
      var userToEdit = this.users[0];
      this.users.forEach((user) => {
        if (user.id === this.currentUserId) userToEdit = user;
      });
      userToEdit.name = this.editUserFormGroup.controls.nameControl.value!;
      userToEdit.email = this.editUserFormGroup.controls.emailControl.value!;
      userToEdit.role = this.editUserFormGroup.controls.roleControl.value!;
      this.usersService.editUser(userToEdit.id!, userToEdit).subscribe({
        next: (response) => {
          console.log(response);
        },
      });
    }
  }
}
