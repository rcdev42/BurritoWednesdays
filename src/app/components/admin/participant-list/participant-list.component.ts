import { Component, OnInit } from '@angular/core';

import { AfDataService } from '../../../services/afData.service';

import { Participant } from '../../../interfaces/participant';
import { Order } from '../../../interfaces/order';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  public participants: Participant[];

  constructor(private afDataService: AfDataService) { }

  ngOnInit() {
    // read participants
    this.afDataService.readParticipants().subscribe(items => {
      this.participants = items;
    });
  }

  private actionDelete(participantKey: string, name: string): void {
    // delete in the db
    if (confirm("Are you sure to delete " + name)) {
      this.afDataService.deleteParticipant(participantKey);
    }
  }

  private actionUpdateOptInOut(participantKey: string): void {
    for (let i = 0; i < this.participants.length; i++) {
      let participant = this.participants[i];

      // set the new
      if (participant.$key == participantKey) {
        // toggle
        participant.optInOut = !participant.optInOut;
        // update
        this.afDataService.updateParticipant(participant);

        break;
      }
    }
  }

  private actionUpdatePurchaseTurn(participantKey: string): void {
    for (let i = 0; i < this.participants.length; i++) {
      let participant = this.participants[i];

      // clear the existing
      if (participant.purchaseTurn == true) {
        // update in the db
        participant.purchaseTurn = false;
        this.afDataService.updateParticipant(participant);
      }

      // set the new
      if (participant.$key == participantKey) {
        // update in the db
        participant.purchaseTurn = true;
        this.afDataService.updateParticipant(participant);
      }
    }
  }

}
