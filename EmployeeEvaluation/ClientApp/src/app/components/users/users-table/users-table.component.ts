import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
import { Table } from 'primeng/table';
import { DefaultRoles } from 'src/api-authorization/role-defines';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
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
  selectedUser!: UserDTO;
  roles = DefaultRoles.AllRoles;
  projects: Project[] = [];
  currentUserId?: Guid;
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
  ngOnDestroy(): void {}
  clear(table: Table) {
    table.clear();
  }
  showAddDialog() {
    this.displayAddModal = !this.displayAddModal;
  }
  
  showEditUserDialog(user: UserDTO) 
  {    
    this.setSelectedUser(user);
    this.displayEditModal = true;
  }

  hideEditUserDialog()
  {
    this.displayEditModal = false;
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
    let selectedUser = this.users.find(user=> user.id === id);
    if (selectedUser)
    {
      this.currentUserId = id;
      this.editUserFormGroup.controls.nameControl.setValue(selectedUser.name);
      this.editUserFormGroup.controls.emailControl.setValue(selectedUser.email);
      this.editUserFormGroup.controls.roleControl.setValue(selectedUser.role);
    }      
  }

  setSelectedUser(userToSet: UserDTO)
  {
    this.selectedUser = userToSet;
    if (this.selectedUser)
    {
      this.currentUserId = this.selectedUser.id;
      this.editUserFormGroup.controls.nameControl.setValue(this.selectedUser.name);
      this.editUserFormGroup.controls.emailControl.setValue(this.selectedUser.email);
      this.editUserFormGroup.controls.roleControl.setValue(this.selectedUser.role);
    }  
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
        this.addUserFormGroup.controls.nameControl.setValue('');
        this.addUserFormGroup.controls.emailControl.setValue('');
        this.addUserFormGroup.controls.roleControl.setValue('');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  httpDeleteUser() {
    if (this.currentUserId !== undefined) {
      this.usersService.deleteUser(this.currentUserId).subscribe({
        next: (response) => {
          console.log(response);
          this.httpGetUsers();
        },
      });
    }
  }

  saveEditedUser() {    
    this.selectedUser.name = this.editUserFormGroup.controls.nameControl.value!;
    this.selectedUser.email = this.editUserFormGroup.controls.emailControl.value!;
    this.selectedUser.role = this.editUserFormGroup.controls.roleControl.value!;
    this.usersService.editUser(this.selectedUser.id!, this.selectedUser).subscribe({
      next: (response) => {
        console.log(response);
        this.httpGetUsers();
      },
    });
    this.hideEditUserDialog();
  }
}
