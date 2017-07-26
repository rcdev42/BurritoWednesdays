import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AfDataService } from '../../../services/afData.service';

import { Participant } from '../../../interfaces/participant';
import { Order } from '../../../interfaces/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private participantKey: string = '';
  private participant: Participant;
  private orders: Order[];

  constructor(private afDataService: AfDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.participantKey = params['participantKey'];

      // read participant
      this.afDataService.readParticipant(this.participantKey).subscribe(item => {
        this.participant = item;
      });
    });

    // read orders
    this.afDataService.readOrdersByParticipant(this.participantKey).subscribe(items => {
      this.orders = items;
    });
  }

  private actionDelete(orderKey: string, name: string): void {
    // delete in the db
    if (confirm("Are you sure to delete " + name)) {
      this.afDataService.deleteOrder(orderKey);
    }
  }

  private actionUpdateDefaultOrder(orderKey: string): void {
    // set the new default order
    this.participant.defaultOrderKey = orderKey;

    // update
    this.afDataService.updateParticipant(this.participant);
  }

}
