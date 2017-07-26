import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../../firebase.conf';

import { AfAuthService } from './services/afAuth.service';
import { AfDataService } from './services/afData.service';
import { AuthGuardService } from './services/authGuard.service';
import { GlobalEventsManagerService } from './services/globalEventsManager.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ParticipantListComponent } from './components/admin/participant-list/participant-list.component';
import { ParticipantDetailComponent } from './components/admin/participant-detail/participant-detail.component';
import { OrderListComponent } from './components/admin/order-list/order-list.component';
import { OrderDetailComponent } from './components/admin/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/participant-list', component: ParticipantListComponent, canActivate: [AuthGuardService] },
  { path: 'admin/participant-detail/:mode/:participantKey', component: ParticipantDetailComponent, canActivate: [AuthGuardService] },
  { path: 'admin/order-list/:participantKey', component: OrderListComponent, canActivate: [AuthGuardService] },
  { path: 'admin/order-detail/:participantKey/:mode/:orderKey', component: OrderDetailComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [ AppComponent, HomeComponent, LoginComponent, ParticipantListComponent, ParticipantDetailComponent, OrderListComponent, OrderDetailComponent ],
  imports:      [ BrowserModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig), RouterModule.forRoot(routes) ],
  providers:    [ AngularFireDatabase, AngularFireAuth, AfAuthService, AfDataService, AuthGuardService, GlobalEventsManagerService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
