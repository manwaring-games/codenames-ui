import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../services/session.service';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { Router } from '@angular/router';
import { Team } from '../model/team';

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
      let player = new Player();
      player.name = this.username.value;
      player.team = Team.None;
      player.id = (Math.floor(Math.random() * 100000) + 1).toString();
      player.isHost = this.newGame;
      this.sessionService.playerId = player.id;

      let game = new Game();
      game.code = this.gameCode.value;
      game.players = [player];
      this.sessionService.updateGame(game);

      this.router.navigate(['/lobby']);
    }, (reason) => {
      console.log('cancelled');
    });
  }

}
