import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Department } from 'src/app/models/department.model';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css'],
})
export class DepartmentTableComponent implements OnInit {
  addDepartmentFormGroup = new FormGroup({
    nameControl: new FormControl(''),
    headOfDepartmentControl: new FormControl(''),
  });
  departments: Department[] = [];
  users: UserDTO[] = [];
  constructor(
    private departmentsService: DepartmentsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.httpGetDepartments();
    this.httpGetUsers();
  }
  httpGetDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
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
  httpDeleteDepartment(id: Guid) {
    for (let i = 0; i < this.departments.length; i++) {
      if (this.departments[i].id == id) this.departments.splice(i, 1);
    }
    this.departmentsService.deleteDepartment(id).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  httpEditDepartment(id: Guid) {
    for (let i = 0; i < this.departments.length; i++) {
      if (this.departments[i].id === id) {
        this.departments[i].name =
          this.addDepartmentFormGroup.controls.nameControl.value!;
        this.departments[i].headOfDepartment =
          this.getHeadOfDepartmentByName()!;
        this.departmentsService
          .editDepartment(id, this.departments[i])
          .subscribe({
            next: (response) => {
              console.log(response);
            },
          });
        break;
      }
    }
  }
  getHeadOfDepartmentByName() {
    var name =
      this.addDepartmentFormGroup.controls.headOfDepartmentControl.value!;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == name) return this.users[i].id;
    }
    return null;
  }
}
