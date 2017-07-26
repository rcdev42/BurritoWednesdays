import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalEventsManagerService {

  private keepAlertAfterNavigationChange = false;

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedInObservable: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private alertMessageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public alertMessageInObservable: Observable<any> = this.alertMessageSubject.asObservable();

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAlertAfterNavigationChange) {
          // only keep for a single location change
          this.keepAlertAfterNavigationChange = false;
        }
        else {
          // clear alert
          this.alertMessageSubject.next(null);
        }
      }
    });
  }

  alertSuccess(message: string, keepAlertAfterNavigationChange = false) {
    this.keepAlertAfterNavigationChange = keepAlertAfterNavigationChange;
    this.alertMessageSubject.next({ type: 'success', text: message });
  }

  alertError(message: string, keepAlertAfterNavigationChange = false) {
    this.keepAlertAfterNavigationChange = keepAlertAfterNavigationChange;
    this.alertMessageSubject.next({ type: 'error', text: message });
  }

  alertIsLoggedIn(loggedIn: boolean) {
    this.isLoggedInSubject.next(loggedIn);
  }

}
