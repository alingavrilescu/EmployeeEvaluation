import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-buttons',
  templateUrl: './users-buttons.component.html',
  styleUrls: ['./users-buttons.component.css'],
})
export class UsersButtonsComponent implements OnInit {
  @Output() notifyUsers: EventEmitter<UserDTO[]> = new EventEmitter<UserDTO[]>
  @Output() notifyProjects: EventEmitter<Project[]> = new EventEmitter<Project[]>

  addUserFormGroup = new FormGroup({
    nameControl: new FormControl(''),
    emailControl: new FormControl(''),
    roleControl: new FormControl(''),
  });
  projects: Project[] = [];
  users: UserDTO[] = [];
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.httpGetProjects();
  }

  httpGetProjects() {
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.notifyProjects.emit(projects)
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
        this.notifyUsers.emit(this.users);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  refresh() {
    this.httpGetProjects();
    this.httpGetUsers();
  }

  httpAddUser() {
    var newUser = new UserDTO();
    newUser.name = this.addUserFormGroup.controls.nameControl.value!;
    newUser.email = this.addUserFormGroup.controls.emailControl.value!;
    newUser.id = '';
    newUser.role = this.addUserFormGroup.controls.roleControl.value!;
    // newUser.project = this.addUserFormGroup.controls.projectControl.value!;
    this.usersService.addUser(newUser).subscribe({
      next: (user) => {
        alert('Account successfuly created!');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
