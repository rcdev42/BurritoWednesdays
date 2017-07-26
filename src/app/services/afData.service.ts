import { Injectable } from "@angular/core";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { Participant } from '../interfaces/participant';
import { Order } from '../interfaces/order';

@Injectable()
export class AfDataService {

  public orders: FirebaseListObservable<Order[]>;

  constructor(public af: AngularFireModule, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.orders = this.db.list('orders') as FirebaseListObservable<Order[]>;
  }

  /* ====================================================================== */

  readParticipant(participantKey: string) {
    return this.db.object('participants/' + participantKey) as FirebaseObjectObservable<Participant>;
    //return this.participants.map(items => { items.$key === participantKey })[0];
  }

  readParticipants() {
    return this.db.list('participants') as FirebaseListObservable<Participant[]>;
  }

  createParticipant(participant: Participant) {
    return this.readParticipants().push(participant);
  }

  updateParticipant(participant: Participant) {
    return this.readParticipants().update(participant.$key, participant);
  }

  deleteParticipant(key: string) {
    return this.readParticipants().remove(key);
  }

  /* ====================================================================== */

  readOrder(orderKey: string) {
    return this.db.object('orders/' + orderKey) as FirebaseObjectObservable<Order>;
  }

  readOrders() {
    return this.db.list('orders') as FirebaseListObservable<Order[]>;
  }

  readOrdersByParticipant(participantKey: string) {
    return this.db.list('orders', { query: { orderByChild: 'participantKey', equalTo: participantKey }}) as FirebaseListObservable<Order[]>;
  }

  createOrder(order: Order) {
    return this.readOrders().push(order);
  }

  updateOrder(order: Order) {
    return this.readOrders().update(order.$key, order);
  }

  deleteOrder(key: string) {
    return this.readOrders().remove(key);
  }

  /* ====================================================================== */

}
