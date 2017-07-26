import { Injectable } from "@angular/core";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { GlobalEventsManagerService } from './globalEventsManager.service';

@Injectable()
export class AfAuthService {

  constructor(public af: AngularFireModule, public afAuth: AngularFireAuth, public db: AngularFireDatabase, private globalEventsManagerService: GlobalEventsManagerService) {
    // subscript to the main auth service so we know when the user logged in or logged out
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        globalEventsManagerService.alertIsLoggedIn(true);
      }
      else {
        globalEventsManagerService.alertIsLoggedIn(false);
      }
    });
  }

  public loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

}
