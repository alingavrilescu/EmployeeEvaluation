import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
})
export class DevelopersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  users: UserDTO[] = [];
  currentUserId!: Guid;
  displayDeleteDialog: boolean = false;
  departmentId: any;
  showDeleteDialog(id: Guid) {
    this.setCurrentUserId(id);
    this.displayDeleteDialog = true;
  }
  hideDeleteDialog() {
    this.displayDeleteDialog = false;
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getDevelopers();
    });
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }
  setCurrentUserId(id: Guid) {
    this.currentUserId = id;
  }
  deleteUserFromDepartment() {
    this.hideDeleteDialog();
    this.departmentsService
      .removeUserFromDepartment(this.departmentId, this.currentUserId)
      .subscribe(() => {
        this.getDevelopers();
      });
  }
  getDevelopers() {
    this.usersService.getDevsOfDep(this.departmentId).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
