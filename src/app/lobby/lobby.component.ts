import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Player } from '../model/player';
import { Game } from '../model/game';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  player: Player
  game: Game

  constructor(
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    this.player = this.sessionService.player;
    this.game = this.sessionService.game;
  }

}
