import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';

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
    private router:Router
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
      let person:Person = {
        id: (Math.floor(Math.random() * 100000) + 1).toString(),
        name: this.username.value,
        team: null,
        role: Role.SPY
      };

      this.sessionService.personId = person.id;

      let game:Game = {
        id: (Math.floor(Math.random() * 100000) + 1).toString(),
        code: this.gameCode.value,
        started: false,
        turn: null,
        tiles: null,
        people: [person]
      };
      this.sessionService.updateGame(game);

      this.router.navigate(['/lobby']);
    });
  }

}
