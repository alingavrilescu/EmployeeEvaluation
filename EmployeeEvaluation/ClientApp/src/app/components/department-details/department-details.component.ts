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
    this.displayAddDialog = !this.displayAddDialog;
  }
  showDeleteDialog() {
    this.displayDeleteDialog = !this.displayDeleteDialog;
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  addUsersToDepartment() {
    var ids: any = this.addUserFormGroup.controls.nameControl.value!;
    this.departmentsService
      .addUsersToDepartment(this.departmentId, ids)
      .subscribe(() => {
        this.getUsersOfDepartment();
        this.getUsersWithoutDepartment();
      });
  }
  deleteUserFromDepartment() {
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
