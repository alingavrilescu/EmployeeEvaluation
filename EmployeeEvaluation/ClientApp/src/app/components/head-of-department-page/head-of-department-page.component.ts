import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { UserDTO } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-head-of-department-page',
  templateUrl: './head-of-department-page.component.html',
  styleUrls: ['./head-of-department-page.component.css'],
})
export class HeadOfDepartmentPageComponent implements OnInit {
  headOfDepartment!: UserDTO;
  departmentId!: Guid;
  constructor(
    private authorizeService: AuthorizeService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.authorizeService.getUser().subscribe((data) => {
      var tempUser: any = data;
      this.userService.getUserById(tempUser.sub).subscribe((result) => {
        this.headOfDepartment = result;
        this.departmentId = this.headOfDepartment.departmentId!;
      });
    });
  }
}
