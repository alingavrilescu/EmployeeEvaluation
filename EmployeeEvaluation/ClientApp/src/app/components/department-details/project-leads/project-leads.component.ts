import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-project-leads',
  templateUrl: './project-leads.component.html',
  styleUrls: ['./project-leads.component.css']
})
export class ProjectLeadsComponent implements OnInit {

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) { }

  users: UserDTO[] = []

  departmentId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getProjectLeads();
    });
  }

  getEventValue($event: any): string {
    return $event.target.value;
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
