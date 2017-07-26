import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { AfAuthService } from './services/afAuth.service';
import { GlobalEventsManagerService } from './services/globalEventsManager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn: boolean;

  constructor(private afAuthService: AfAuthService, private globalEventsManagerService: GlobalEventsManagerService, private router: Router) {
    // subscripe to the logged in event from the global event manager service
    // this will update the local variable everytime the global event manager service updates its variable
    this.globalEventsManagerService.isLoggedInObservable.subscribe(mode => {
      this.isLoggedIn = mode;
    });
  }

  logout() {
    // log out
    this.afAuthService.logout();

    // redirect to home
    this.router.navigate(['']);
  }

}
