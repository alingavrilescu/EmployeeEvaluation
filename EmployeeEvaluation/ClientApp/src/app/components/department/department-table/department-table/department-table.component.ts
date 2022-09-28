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
  editDepartmentFormGroup = new FormGroup({
    nameControl: new FormControl(''),
    headOfDepartmentControl: new FormControl(''),
  });
  displayAddModal: boolean = false;
  displayEditModal: boolean = false;
  displayDeleteModal: boolean = false;
  departments: Department[] = [];
  currentDepartmentId!: Guid;
  users: UserDTO[] = [];
  usersHOD: UserDTO[] = [];
  usersHODNames: string[] = [];
  constructor(
    private departmentsService: DepartmentsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.httpGetDepartments();
    this.httpGetUsers();
    this.getHOD();
  }
  getHOD() {
    this.usersService.getHODepWithoutDep().subscribe({
      next: (usersHOD) => {
        this.usersHOD = usersHOD;
        usersHOD.forEach((element) => {
          this.usersHODNames.push(element.name);
        });
      },
    });
  }
  setCurrentDepartmentId(id: Guid) {
    this.currentDepartmentId = id;
    this.departments.forEach((department) => {
      if (department.id === id) {
        this.editDepartmentFormGroup.controls.nameControl.setValue(
          'Softelligence'
        );
        this.editDepartmentFormGroup.controls.headOfDepartmentControl.setValue(
          'Mark'
        );
      }
    });
  }
  showAddDialog() {
    this.displayAddModal = true;
  }
  hideAddDialog() {
    this.displayAddModal = false;
  }
  showEditDialog() {
    this.displayEditModal = true;
  }
  hideEditDialog() {
    this.displayEditModal = false;
  }
  showDeleteDialog() {
    this.displayDeleteModal = true;
  }
  hideDeleteDialog() {
    this.displayDeleteModal = false;
  }
  httpAddDepartment() {
    this.hideAddDialog();
    var newDepartment = new Department();
    newDepartment.name =
      this.addDepartmentFormGroup.controls.nameControl.value!;
    newDepartment.headOfDepartment = this.getHeadOfDepartment()!;
    this.departmentsService.addDepartment(newDepartment).subscribe({
      next: (department) => {
        this.departments.push(department);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  getHeadOfDepartment() {
    var name =
      this.addDepartmentFormGroup.controls.headOfDepartmentControl.value!;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == name) return this.users[i].id;
    }
    return null;
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
  httpDeleteDepartment() {
    this.hideDeleteDialog();
    this.departmentsService
      .deleteDepartment(this.currentDepartmentId)
      .subscribe({
        next: (response) => {
          this.httpGetDepartments();
          this.httpGetUsers();
          console.log(response);
        },
      });
  }

  httpEditDepartment() {
    this.hideEditDialog();
    this.departmentsService
      .getDepartmentById(this.currentDepartmentId)
      .subscribe({
        next: (department) => {
          department.name =
            this.editDepartmentFormGroup.controls.nameControl.value!;
          department.headOfDepartment = this.getHeadOfDepartmentByName()!;
          this.departmentsService
            .editDepartment(this.currentDepartmentId, department)
            .subscribe(() => {
              this.httpGetDepartments();
              this.httpGetUsers();
            });
        },
      });
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
