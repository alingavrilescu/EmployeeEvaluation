import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { elementAt } from 'rxjs/operators';
import { Department } from 'src/app/models/department.model';
import { DepartmentStatistics } from 'src/app/models/departments-statistics';
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
    nameControl: new FormControl('', Validators.required),
    headOfDepartmentControl: new FormControl('', Validators.required),
  });
  editDepartmentFormGroup = new FormGroup({
    nameControl: new FormControl('', Validators.required),
    headOfDepartmentControl: new FormControl('', Validators.required),
  });
  displayAddModal: boolean = false;
  displayEditModal: boolean = false;
  displayDeleteModal: boolean = false;
  departments: Department[] = [];
  currentDepartmentId!: Guid;
  users: UserDTO[] = [];
  usersHOD: UserDTO[] = [];
  usersHODNames: string[] = [];
  statistics!: Map<Guid | undefined, Observable<DepartmentStatistics> | null>;

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
    this.addDepartmentFormGroup.controls.headOfDepartmentControl.setValue(
      this.usersHOD[0].name
    );
    this.displayAddModal = true;
  }
  hideAddDialog() {
    this.displayAddModal = false;
  }
  showEditDialog(id: Guid, hodId: Guid) {
    this.setCurrentDepartmentId(id);
    this.editDepartmentFormGroup.controls.headOfDepartmentControl.setValue(
      this.getNameOfHOD(hodId)
    );
    this.displayEditModal = true;
  }
  hideEditDialog() {
    this.displayEditModal = false;
  }
  showDeleteDialog(id: Guid) {
    this.setCurrentDepartmentId(id);
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
    newDepartment.headOfDepartmentId = this.getHeadOfDepartmentByName()!;
    this.departmentsService.addDepartment(newDepartment).subscribe({
      next: (department) => {
        this.departments.push(department);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  httpGetDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        let stats: Map<
          Guid | undefined,
          Observable<DepartmentStatistics> | null
        > = new Map();
        departments.forEach((department) => {
          if (department && department.id)
            stats.set(
              department.id,
              this.getDepartmentStatistics(department.id)
            );
        });
        this.statistics = stats;
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
          department.headOfDepartmentId = this.getHeadOfDepartmentByName()!;
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
  getNameOfHOD(id: Guid) {
    for (let i = 0; i < this.usersHOD.length; i++) {
      if (this.usersHOD[i].id === id) return this.usersHOD[i].name;
    }
    return 'No Head Of Department';
  }
  getDepartmentStatistics(depId?: Guid) {
    if (depId) return this.departmentsService.getDepartmentStatistics(depId);
    return null;
  }
  logStat(stat: any): number {
    console.log(stat);
    return 1;
  }
}
