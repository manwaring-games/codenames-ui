import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { faCrown, faBullhorn, faLink } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameSetupService } from '../services/api/game-setup.service';
import { GameActionsService } from '../services/api/game-actions.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  faCrown = faCrown; faBullhorn = faBullhorn; faLink = faLink;
  person: Person
  game: Game
  Team = Team;
  Role = Role;

  constructor(
    private sessionService: SessionService,
    private modalService: NgbModal,
    private gameSetupService: GameSetupService,
    private gameActionsService: GameActionsService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.sessionService.game$.subscribe(game => {
      this.game = game;
      this.person = game.people.find(z => z.id == this.sessionService.personId);
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
          this.router.navigate(['/game']);
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

  onGameCodeLinkClick() {
    let linkHost = window.location.href.replace(window.location.pathname, '');
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${linkHost}/join/${this.game.code}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('Sharing link copied to clipboard');
  }

}
