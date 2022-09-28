import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-project-managers',
  templateUrl: './project-managers.component.html',
  styleUrls: ['./project-managers.component.css']
})
export class ProjectManagersComponent implements OnInit {

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) { }

  users: UserDTO[] = []

  departmentId: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.departmentId = params.get('id');
      this.getProjectManagers();
    });
  }

  getEventValue($event: any): string {
    return $event.target.value;
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


