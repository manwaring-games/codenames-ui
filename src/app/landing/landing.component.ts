import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { GameSetupService } from '../services/api/game-setup.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('joinGameModal')
  private joinGameModal: TemplateRef<any>;

  gameCode = new FormControl('');
  username = new FormControl('');

  newGame: boolean = false;

  constructor(
    private modalService: NgbModal,
    private sessionService:SessionService,
    private router:Router,
    private gameSetupService:GameSetupService
  ) { }

  ngOnInit(): void {
  }

  onJoinGameClick() {
    this.openUsernameModal();
  }

  onNewGameClick() {
    this.newGame = true;
    this.gameCode.setValue('QXTPRY');
    this.openUsernameModal();
  }

  openUsernameModal() {
    this.modalService.open(this.joinGameModal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static'}).result.then((result) => {

      if (this.newGame) {
        this.gameSetupService.newGame(this.username.value).subscribe(response => {
          this.router.navigate(['/lobby']);
        });
      } else {
        this.gameSetupService.joinGame(this.gameCode.value, this.username.value).subscribe(response => {
          this.router.navigate(['/lobby']);
        });
      }
    });
  }

}
