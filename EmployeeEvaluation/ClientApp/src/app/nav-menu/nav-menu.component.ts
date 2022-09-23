import { AfterViewInit, Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit, AfterViewInit {
  isExpanded = false;
  shouldDisplayUsers$?: Observable<boolean>;
  constructor(private authorizeService: AuthorizeService){}
  ngAfterViewInit(): void {
    this.shouldDisplayUsers$ =combineLatest([this.authorizeService.isUserAdmin(), this.authorizeService.isUserHR()])
      .pipe(map( ([isAdmin, isHr]) => {return isAdmin || isHr;})); 
  }
  ngOnInit()
  {
    
       
  }  

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
