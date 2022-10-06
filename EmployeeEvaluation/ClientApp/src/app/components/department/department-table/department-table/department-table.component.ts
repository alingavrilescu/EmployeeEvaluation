import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable, Subscription } from 'rxjs';
import { elementAt, map } from 'rxjs/operators';
import { DefaultRoles } from 'src/api-authorization/role-defines';
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
export class DepartmentTableComponent implements OnInit, OnDestroy {
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
  HODeps: UserDTO[] = [];
  HODepsWithoutDep: UserDTO[] = [];
  HODepList!:Observable<UserDTO[]>;
  statistics!: Map<Guid | undefined, Observable<DepartmentStatistics> | null>;
  getDepartmentsSubscription!:Subscription;
  addDepartmentSubscription!:Subscription;
  editDepartmentSubscription!:Subscription;
  deleteDepartmentSubscription!:Subscription;

  constructor(private departmentsService: DepartmentsService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  ngOnDestroy(): void {
    this.getDepartmentsSubscription?.unsubscribe();
    this.addDepartmentSubscription?.unsubscribe();
    this.editDepartmentSubscription?.unsubscribe();
    this.deleteDepartmentSubscription?.unsubscribe();
  }

  getDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        let stats: Map<Guid | undefined, Observable<DepartmentStatistics> | null> = new Map();
        departments.forEach((department) => {
          if (department && department.id)
          {
            stats.set(department.id, this.getDepartmentStatistics(department.id));
            this.HODepList=this.getHODepList();
          }
        });
        this.statistics = stats;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  addDepartment() {
    this.hideAddDialog();
    var newDepartment = new Department();
    newDepartment.name = this.addDepartmentFormGroup.controls.nameControl.value!;
    newDepartment.headOfDepartmentId = this.addDepartmentFormGroup.controls.headOfDepartmentControl.value!;
    this.departmentsService.addDepartment(newDepartment).subscribe({
      next: (department) => {
        this.departments.push(department);
        this.getDepartments();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  
  editDepartment() {
    this.hideEditDialog();
    var departmentToEdit={
      name:this.editDepartmentFormGroup.controls.nameControl.value!,
      headOfDepartmentId:this.editDepartmentFormGroup.controls.headOfDepartmentControl.value!
    }
    this.editDepartmentSubscription=this.departmentsService.editDepartment(this.currentDepartmentId,departmentToEdit).subscribe(()=>{this.getDepartments();});
  }

  deleteDepartment() {
    this.hideDeleteDialog();
    this.getDepartmentsSubscription=this.departmentsService
      .deleteDepartment(this.currentDepartmentId)
      .subscribe({
        next: (response) => {
          this.getDepartments();
        },
      });
  }

  getHODep(){
    this.usersService.getHODep(this.currentDepartmentId).subscribe(data=>{
      this.HODeps=data;
    })
  }

  getHODepWithoutDep(){
    this.usersService.getHODepWithoutDep().subscribe(data=>{
      this.HODepsWithoutDep=data;
    })
  }

  getHODepList(){
    return this.usersService.getUsers()
                            .pipe(
                                map(userData => userData.filter(user => user.role === DefaultRoles.HeadOfDepartment))                             
                                );
  }

  getHODepForCards(allHODeps:UserDTO[] | null, departmentId?: Guid): UserDTO | undefined
  {
    let user = allHODeps?.find(user => user.departmentId===departmentId);
    return user;
  }

  getDepartmentStatistics(depId?: Guid) {
    if (depId) return this.departmentsService.getDepartmentStatistics(depId);
    return null;
  }
  logStat(stat: any): number {
    console.log(stat);
    return 1;
  }

  // ===================== MODAL CONTROL METHODS===============
  showAddDialog() {
    this.getHODepWithoutDep();
    this.displayAddModal = true;
  }
  hideAddDialog() {
    this.displayAddModal = false;
  }
  showEditDialog(department:Department) {
    this.displayEditModal = true;
    if(department.id)
    {
      this.currentDepartmentId=department.id;
    }
    this.getHODep();
    this.editDepartmentFormGroup.controls.nameControl.setValue(department.name);
    this.editDepartmentFormGroup.controls.headOfDepartmentControl.setValue(department.headOfDepartmentId);
  }
  hideEditDialog() {
    this.displayEditModal = false;
  }
  showDeleteDialog(id:Guid) {
    this.currentDepartmentId=id;
    this.displayDeleteModal = true;
  }
  hideDeleteDialog() {
    this.displayDeleteModal = false;
  }
}
