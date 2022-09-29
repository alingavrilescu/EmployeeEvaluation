import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Project } from 'src/app/models/project.model';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
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
  allUsers: UserDTO[] = [];
  displayAddDialog: boolean = false;
  displayDeleteDialog: boolean = false;
  departmentId: any;
  // numberOfProjects = 0;
  // numberOfProjectLeads = 0;
  // numberOfProjectManagers = 0;
  // numberOfDevelopers = 0;
  // numberOfMembers = 0;
  // numberOfFormTemplates = 0;
  currentUserId!: Guid;
  addUserFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
  });
  constructor(
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data;
    });
    this.getUsersWithoutDepartment();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getUsersOfDepartment();
      // this.getNumberOfUsers();
    });
  }
  getUsersOfDepartment() {
    this.usersService.getUsersOfDepartment(this.departmentId).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  // getNumberOfUsers() {
  //   this.numberOfMembers = this.users.length;
  //   this.numberOfProjects = this.projects.length;
  //   this.users.forEach((user) => {
  //     if (user.role === 'Team Lead') this.numberOfProjectLeads += 1;
  //     else if (user.role === 'Project Manager')
  //       this.numberOfProjectManagers += 1;
  //     else if (user.role === 'Development Member') this.numberOfDevelopers += 1;
  //   });
  // }
  getUsersWithoutDepartment() {
    this.usersService.getUsersWithoutDepartment().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }
  hideAddDialog() {
    this.displayAddDialog = false;
  }
  showDeleteDialog(id: Guid) {
    this.setCurrentUserId(id);
    this.displayDeleteDialog = true;
  }
  hideDeleteDialog() {
    this.displayDeleteDialog = false;
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  addUsersToDepartment() {
    this.hideAddDialog();
    var ids: any = this.addUserFormGroup.controls.nameControl.value!;
    this.departmentsService
      .addUsersToDepartment(this.departmentId, ids)
      .subscribe(() => {
        this.getUsersOfDepartment();
        this.getUsersWithoutDepartment();
      });
  }
  deleteUserFromDepartment() {
    this.hideDeleteDialog();
    this.departmentsService
      .removeUserFromDepartment(this.departmentId, this.currentUserId)
      .subscribe(() => {
        this.getUsersOfDepartment();
        this.getUsersWithoutDepartment();
      });
  }
  setCurrentUserId(id: Guid) {
    this.currentUserId = id;
  }
}
