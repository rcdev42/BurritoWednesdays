import { Component, OnInit } from '@angular/core';

import { AfDataService } from '../../services/afData.service';

import { Participant } from '../../interfaces/participant';
import { Order } from '../../interfaces/order';

@Component({
  selector:     'app-home',
  templateUrl:  './home.component.html',
  styleUrls:    [ './home.component.css' ],
  providers:    [ AfDataService ]
})
export class HomeComponent implements OnInit {

  participants: Participant[];
  orders: Order[];

  constructor(private afDataService: AfDataService) { }

  ngOnInit() {
    // load all the orders
    this.afDataService.readOrders().subscribe(items => {
      // save the orders
      this.orders = items;

      // load the participants
      this.afDataService.readParticipants().subscribe(items => {
        // save the participants
        this.participants = items;

        // set the default order
        for (let i = 0; i < this.participants.length; i++) {
          let participant = this.participants[i];
          for (let j = 0; j < this.orders.length; j++) {
            let order = this.orders[j];
            if (order.$key == participant.defaultOrderKey) {
              participant.defaultOrder = order;
              break;
            }
          }
        }

        // this.participants.forEach(participant => {
        //   this.orders.forEach(order => {
        //     if (order.$key == participant.defaultOrderKey) {
        //       participant.defaultOrder = order;
        //     }
        //   });
        // });
      });
    });
  }

}
