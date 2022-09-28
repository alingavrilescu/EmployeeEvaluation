import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  isTeamLead$: Observable<boolean>;
  isDevManager$: Observable<boolean>;
  isHeadOfDept$: Observable<boolean>;
  role$: Observable<string | null>;

  constructor(private authService: AuthorizeService)
  {
    this.isTeamLead$ = this.authService.isUserTeamLead();
    this.isDevManager$ = this.authService.isUserDevelopmentManager();    
    this.isHeadOfDept$ = this.authService.isUserHeadOfDepartment();
    this.role$ = this.authService.getRole();
  }
  
  ngOnInit(): void {
    
  }

}
