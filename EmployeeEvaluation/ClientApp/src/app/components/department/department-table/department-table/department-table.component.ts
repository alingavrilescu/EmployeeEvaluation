import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

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
  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.httpGetDepartments();
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
  // AICI TREBUIE SCHIMBAT CU GUID
  // httpDeleteDepartment(id: string) {
  //   for (let i = 0; i < this.departments.length; i++) {
  //     if (this.departments[i].id == id) this.departments.splice(i, 1);
  //   }
  //   this.departmentsService.deleteDepartment(id).subscribe({
  //     next: (response) => {
  //       console.log(response);
  //     },
  //   });
  // }

  httpEditDepartment(id: string) {
    // var department = this.httpGetDepartmentById(id);
    // department.name = this.addUserFormGroup.controls.nameControl.value!;
    // department.headOfDepartment = this.addUserFormGroup.controls.emailControl.value!;
    // this.departmentsService.editDepartment(id, department).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    // });
  }
}
