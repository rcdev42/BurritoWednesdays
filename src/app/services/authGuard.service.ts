import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';

import { GlobalEventsManagerService } from './globalEventsManager.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  private isLoggedIn: boolean = false;

  constructor(private globalEventsManagerService: GlobalEventsManagerService, private router: Router) {
    // subscripe to the logged in event from the global event manager service
    // this will update the local variable everytime the global event manager service updates its variable
    this.globalEventsManagerService.isLoggedInObservable.subscribe(mode => {
      this.isLoggedIn = mode;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.checkLogin('/' + route.path);
  }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn) { return true; }

    // navigate to login
    this.router.navigate(['/login']);
    return false;
  }

}