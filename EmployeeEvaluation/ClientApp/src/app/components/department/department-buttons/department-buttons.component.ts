import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { DepartmentsService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-department-buttons',
  templateUrl: './department-buttons.component.html',
  styleUrls: ['./department-buttons.component.css'],
})
export class DepartmentButtonsComponent implements OnInit {
  addDepartmentFormGroup = new FormGroup({
    nameControl: new FormControl(''),
    headOfDepartmentControl: new FormControl(''),
  });
  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {}

  httpAddDepartment() {
    var newDepartment = new Department();
    newDepartment.name =
      this.addDepartmentFormGroup.controls.nameControl.value!;
    newDepartment.headOfDepartment =
      this.addDepartmentFormGroup.controls.headOfDepartmentControl.value!;
    newDepartment.id = '';
    this.departmentsService.addDepartment(newDepartment).subscribe({
      next: (department) => {
        alert('Department successfuly created!');
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
