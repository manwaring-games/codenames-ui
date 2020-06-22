import { Component, OnInit } from '@angular/core';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { faCrown, faBullhorn, faLink } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameSetupService } from '../services/api/game-setup.service';
import { GameActionsService } from '../services/api/game-actions.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  faCrown = faCrown; faBullhorn = faBullhorn; faLink = faLink;
  person: Person;
  game: Game;
  Team = Team;
  Role = Role;

  constructor(
    private gameStateService: GameStateService,
    private modalService: NgbModal,
    private gameSetupService: GameSetupService,
    private gameActionsService: GameActionsService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.gameStateService.game$.subscribe(game => {
      this.game = game;
      this.person = this.gameStateService.person;
    })
  }

  onTeamSelect(team:Team.RED|Team.BLUE) {
      const modalRef = this.modalService.open(ConfirmationComponent);

      const component = modalRef.componentInstance as ConfirmationComponent;
      component.titleText = 'Please confirm';
      component.bodyText = 'Are you sure you want to switch teams?'
      component.affirmativeText = 'Yes';
      component.negativeText = 'Cancel';
      component.confirmation$.subscribe(result => {
        if (result) {
          this.gameSetupService.changeTeam(team).subscribe(game => {
            modalRef.close();
          });
        } else {
          modalRef.close();
        }
      });
  }

  onWordMasterSelect() {
    const modalRef = this.modalService.open(ConfirmationComponent);

    const component = modalRef.componentInstance as ConfirmationComponent;
    component.titleText = 'Please confirm';
    component.bodyText = 'Are you sure you want to be WordMaster?'
    component.affirmativeText = 'Yes';
    component.negativeText = 'Cancel';
    component.confirmation$.subscribe(result => {
      if (result) {
        this.gameSetupService.changeRole(Role.SPYMASTER).subscribe(game => {
          modalRef.close();
        });
      } else {
        modalRef.close();
      }
    });
  }

  onStartGameClick() {
    const modalRef = this.modalService.open(ConfirmationComponent);

    const component = modalRef.componentInstance as ConfirmationComponent;
    component.confirmation$.subscribe(result => {
      if (result) {
        this.gameActionsService.startGame().subscribe(result => {
          modalRef.close();
        });
      } else {
        modalRef.close();
      }
    });
    component.titleText = 'Please confirm';
    component.bodyText = 'Are you sure you want to start the game?'
    component.affirmativeText = 'Yes';
    component.negativeText = 'Cancel';
  }

}
