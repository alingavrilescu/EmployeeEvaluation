import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { UserDTO } from 'src/app/models/users.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-project-leads',
  templateUrl: './project-leads.component.html',
  styleUrls: ['./project-leads.component.css'],
})
export class ProjectLeadsComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  users: UserDTO[] = [];
  currentUserId!: Guid;
  displayDeleteDialog: boolean = false;
  departmentId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getProjectLeads();
    });
  }
  setCurrentUserId(id: Guid) {
    this.currentUserId = id;
  }
  deleteUserFromDepartment() {
    this.hideDeleteDialog();
    this.departmentsService
      .removeUserFromDepartment(this.departmentId, this.currentUserId)
      .subscribe(() => {
        this.getProjectLeads();
      });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  showDeleteDialog(id: Guid) {
    this.setCurrentUserId(id);
    this.displayDeleteDialog = true;
  }
  hideDeleteDialog() {
    this.displayDeleteDialog = false;
  }
  getProjectLeads() {
    this.usersService.getTeamLeadsOfDep(this.departmentId).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
