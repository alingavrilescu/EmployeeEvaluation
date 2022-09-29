import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-project-managers',
  templateUrl: './project-managers.component.html',
  styleUrls: ['./project-managers.component.css'],
})
export class ProjectManagersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  users: UserDTO[] = [];

  departmentId: any;
  currentUserId!: Guid;
  displayDeleteDialog: boolean = false;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getProjectManagers();
    });
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
  setCurrentUserId(id: Guid) {
    this.currentUserId = id;
  }
  deleteUserFromDepartment() {
    this.hideDeleteDialog();
    this.departmentsService
      .removeUserFromDepartment(this.departmentId, this.currentUserId)
      .subscribe(() => {
        this.getProjectManagers();
      });
  }
  getProjectManagers() {
    this.usersService.getProjectManagersOfDep(this.departmentId).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
