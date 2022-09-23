import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { AuthorizeService } from './authorize.service';
import { map, tap } from 'rxjs/operators';
import { ApplicationPaths, QueryParameterNames } from './api-authorization.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) {
  }
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let authenticated$ = this.authorize.isAuthenticated()
      .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state, _next)));
      let roleCheck$ = this.authorize.getRole()
                                      .pipe(map(role => this.checkRole(role, _next)))
                                      .pipe(tap(roleIsCorrect => this.handleRoleAuthorization(roleIsCorrect,_next)));
      let result = combineLatest([authenticated$, roleCheck$])                             
                                  .pipe(map(([authIsOK, roleIsCorrect])=>
                                              { 
                                                return authIsOK && roleIsCorrect; 
                                              })
                                      );
      
      return result;
  }

  private checkRole(role: string | null, route: ActivatedRouteSnapshot)
  {
    if (role && route.data.roles)
    {
      let roles: string[] = [];
      roles = roles.concat(route.data.roles);
      let identifiedRoles = roles.filter( element => 
                                {
                                  return (element?.toLowerCase() === role?.toLowerCase());
                                });
      if (identifiedRoles.length === 0)
      {
        return false;
      }                             
    }
    return true;
  }
  private handleRoleAuthorization(roleIsCorrect: boolean, route: ActivatedRouteSnapshot)
  {
    if (!roleIsCorrect)
      this.router.navigate(['/home']);
  }
  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot, route: ActivatedRouteSnapshot) {
    
    if (!isAuthenticated) {
      this.router.navigate(ApplicationPaths.LoginPathComponents, {
        queryParams: {
          [QueryParameterNames.ReturnUrl]: state.url
        }
      });      
    }
  }
}
