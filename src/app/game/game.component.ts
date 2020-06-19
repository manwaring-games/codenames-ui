import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { FormControl } from '@angular/forms';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameActionsService } from '../services/api/game-actions.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  person: Person
  game: Game
  Team = Team;
  Role = Role;
  numGuesses = new FormControl('');

  constructor(
    private sessionService: SessionService,
    private modalService: NgbModal,
    private gameActionsService: GameActionsService
  ) { }

  ngOnInit(): void {
    this.sessionService.game$.subscribe(game => {
      this.game = game;
      this.person = game.people.find(z => z.id == this.sessionService.personId);
    })
  }

  onSubmitGuessesClick() {
    const modalRef = this.modalService.open(ConfirmationComponent);

      const component = modalRef.componentInstance as ConfirmationComponent;
      component.titleText = 'Please confirm';
      component.bodyText = 'Are you sure you want to switch teams?'
      component.affirmativeText = 'Yes';
      component.negativeText = 'Cancel';
      component.confirmation$.subscribe(result => {
        if (result) {
          this.gameActionsService.startTurn(this.numGuesses.value, this.person.team).subscribe(game => {
            modalRef.close();
          });
        } else {
          modalRef.close();
        }
      });
  }

}
