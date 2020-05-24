import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { Team } from '../model/team';
import { faCrown, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  faCrown = faCrown; faBullhorn = faBullhorn;
  player: Player
  game: Game
  Team = Team;

  constructor(
    private sessionService:SessionService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.sessionService.game.subscribe(game => {
      this.game = game;
      this.player = game.players.find(z => z.id == this.sessionService.playerId);
    })
  }

  onTeamSelect(team:Team) {
    if (this.player.team != Team.None) {
      const modalRef = this.modalService.open(ConfirmationComponent);
      modalRef.result.then((result) => {
        this.player.team = team;
        this.sessionService.updatePlayer(this.player);
      });

      const component = modalRef.componentInstance as ConfirmationComponent;
      component.titleText = 'Please confirm';
      component.bodyText = 'Are you sure you want to switch teams?'
      component.affirmativeText = 'Yes';
      component.negativeText = 'Cancel';
    } else {
      this.player.team = team;
      this.sessionService.updatePlayer(this.player);
    }
  }

  onWordMasterSelect() {
    const modalRef = this.modalService.open(ConfirmationComponent);
    modalRef.result.then((result) => {
      this.game.players.forEach(z => {
        if (z.team == this.player.team) {
          if (z.id == this.player.id) {
            z.isWordMaster = true;
          } else {
            z.isWordMaster = false;
          }
        }
      });
      this.sessionService.updateGame(this.game);
    });

    const component = modalRef.componentInstance as ConfirmationComponent;
    component.titleText = 'Please confirm';
    component.bodyText = 'Are you sure you want to be WordMaster?'
    component.affirmativeText = 'Yes';
    component.negativeText = 'Cancel';
  }

  onStartGameClick() {
    const modalRef = this.modalService.open(ConfirmationComponent);
    modalRef.result.then((result) => {
      window.alert('starting game');
    });

    const component = modalRef.componentInstance as ConfirmationComponent;
    component.titleText = 'Please confirm';
    component.bodyText = 'Are you sure you want to start the game?'
    component.affirmativeText = 'Yes';
    component.negativeText = 'Cancel';
  }

}
