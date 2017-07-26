import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AfDataService } from '../../../services/afData.service';
import { Participant } from '../../../interfaces/participant';
import { Order } from '../../../interfaces/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public inputDescription: string = "";
  public inputHotSauce: string = "";
  public inputMisc: string = "";
  public routeMode: string = '';
  public participant: Participant = null;

  private participantKey: string = '';
  private orderKey: string = '';
  private order: Order = null;

  constructor(private afDataService: AfDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // get the ID
    this.activatedRoute.params.subscribe(params => {
      this.routeMode = params['mode'];
      this.participantKey = params['participantKey'];
      this.orderKey = params['orderKey'];

      // read the participant
      this.afDataService.readParticipant(this.participantKey).subscribe(item => {
          this.participant = item;
      });

      // read the order
      if (this.routeMode == 'update' || this.routeMode == 'delete') {
        this.afDataService.readOrder(this.orderKey).subscribe(item => {
          this.order = item;

          // load the form
          this.inputDescription = this.order.description;
          this.inputHotSauce = this.order.hotSauce;
          this.inputMisc = this.order.misc;
        });

      }
    });
  }

  private actionCreate(): void {
    // setup a new object
    let newOrder = {
      participantKey: this.participant.$key,
      description: this.inputDescription,
      hotSauce: this.inputHotSauce,
      misc: this.inputMisc
    } as Order;

    // create in the db
    this.afDataService.createOrder(newOrder);

    // redirect to list
    this.router.navigate(['/admin/order-list', this.participant.$key]);
  }

  private actionUpdate(): void {
    // update selected object
    this.order.description = this.inputDescription;
    this.order.hotSauce = this.inputHotSauce;
    this.order.misc = this.inputMisc;

    // update in the db
    this.afDataService.updateOrder(this.order);

    // redirect to list
    this.router.navigate(['/admin/order-list', this.participant.$key]);
  }

}
