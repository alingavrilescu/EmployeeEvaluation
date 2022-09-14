import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { UsersService } from 'src/app/services/users.service';

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
  users!: UserDTO[];
  constructor(
    private departmentsService: DepartmentsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  httpAddDepartment() {
    var newDepartment = new Department();
    newDepartment.name =
      this.addDepartmentFormGroup.controls.nameControl.value!;
    newDepartment.headOfDepartment = this.getHeadOfDepartment()!;
    this.departmentsService.addDepartment(newDepartment).subscribe({
      next: (department) => {
        alert('Department successfuly created!');
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
}
