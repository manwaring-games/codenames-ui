import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { faCrown, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameSetupService } from '../services/api/game-setup.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  faCrown = faCrown; faBullhorn = faBullhorn;
  person: Person
  game: Game
  Team = Team;
  Role = Role;

  constructor(
    private sessionService: SessionService,
    private modalService: NgbModal,
    private gameSetupService: GameSetupService
  ) { }

  ngOnInit(): void {
    this.sessionService.game.subscribe(game => {
      this.game = game;
      this.person = game.people.find(z => z.id == this.sessionService.personId);
    })
  }

  onTeamSelect(team:Team.RED|Team.BLUE) {
    if (this.person.team != null) {
      const modalRef = this.modalService.open(ConfirmationComponent);
      modalRef.result.then((result) => {
        this.gameSetupService.changeTeam(team).subscribe();
      });

      const component = modalRef.componentInstance as ConfirmationComponent;
      component.titleText = 'Please confirm';
      component.bodyText = 'Are you sure you want to switch teams?'
      component.affirmativeText = 'Yes';
      component.negativeText = 'Cancel';
    } else {
      this.person.team = team;
      this.sessionService.updatePerson(this.person);
    }
  }

  onWordMasterSelect() {
    const modalRef = this.modalService.open(ConfirmationComponent);
    modalRef.result.then((result) => {
      this.gameSetupService.changeRole(Role.SPYMASTER).subscribe();
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
