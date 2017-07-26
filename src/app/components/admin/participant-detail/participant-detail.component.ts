import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AfDataService } from '../../../services/afData.service';
import { Participant } from '../../../interfaces/participant';

@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.css']
})
export class ParticipantDetailComponent implements OnInit {

  private inputName: string = "";
  private inputSequence: number = 0;
  private inputOptInOut: boolean = true;

  private routeMode: string = '';
  private participantKey: string = '';
  private participant: Participant = null;

  constructor(private afDataService: AfDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // get the ID
    this.activatedRoute.params.subscribe(params => {
      this.routeMode = params['mode'];
      this.participantKey = params['participantKey'];

      if (this.routeMode == 'update' || this.routeMode == 'delete') {
        this.afDataService.readParticipant(this.participantKey).subscribe(item => {
          this.participant = item;

          // load the form
          this.inputName = this.participant.name;
          this.inputSequence = this.participant.sequence;
          this.inputOptInOut = this.participant.optInOut;
        });

      }
    });
  }

  private actionCreate(): void {
    // setup a new object
    let newParticipant = {
      name: this.inputName,
      sequence: this.inputSequence,
      optInOut: this.inputOptInOut,
      purchaseTurn: false
    } as Participant;

    // create in the db
    this.afDataService.createParticipant(newParticipant);

    // redirect to list
    this.router.navigate(['/admin/participant-list']);
  }

  private actionUpdate(): void {
    // update selected object
    this.participant.name = this.inputName;
    this.participant.sequence = this.inputSequence;
    this.participant.optInOut = this.inputOptInOut;

    // update in the db
    this.afDataService.updateParticipant(this.participant);

    // redirect to list
    this.router.navigate(['/admin/participant-list']);
  }

}
