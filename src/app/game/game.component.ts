import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Person, Game, Team, Role, Tile } from '@manwaring-games/codenames-common';
import { FormControl } from '@angular/forms';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameActionsService } from '../services/api/game-actions.service';
import { GameStateService } from '../services/game-state.service';

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
    private modalService: NgbModal,
    private gameActionsService: GameActionsService,
    private gameStateService: GameStateService
  ) { }

  ngOnInit(): void {
    this.gameStateService.game$.subscribe(game => {
      this.game = game;
      this.person = this.gameStateService.person;
    });
  }

  onSubmitGuessesClick() {
    const modalRef = this.modalService.open(ConfirmationComponent);

    const component = modalRef.componentInstance as ConfirmationComponent;
    component.titleText = 'Please confirm';
    component.bodyText = `Are you sure you want to submit ${this.numGuesses.value}?`
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

  onTileClick(tile:Tile) {
    //TODO: also check if player is not spymaster
    if (!tile.selected && 
      this.game.turns.active != null && 
      this.game.turns.active.team == this.person.team) {
        const modalRef = this.modalService.open(ConfirmationComponent);

        const component = modalRef.componentInstance as ConfirmationComponent;
        component.titleText = 'Please confirm';
        component.bodyText = `Are you sure you want to guess ${tile.word}?`
        component.affirmativeText = 'Yes';
        component.negativeText = 'Cancel';
        component.confirmation$.subscribe(result => {
          if (result) {
            this.gameActionsService.makeGuess(tile).subscribe(game => {
              modalRef.close();
            });
          } else {
            modalRef.close();
          }
        });
    }
  }

}
