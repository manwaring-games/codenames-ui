import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { Team } from '../model/team';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  faCrown = faCrown;
  player: Player
  game: Game
  Team = Team;

  constructor(
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.player.subscribe(player => {
      this.player = player;
    })
    this.sessionService.game.subscribe(game => {
      this.game = game;
    })
  }

  onTeamSelect(team:Team) {
    this.player.team = team;
    this.sessionService.updatePlayer(this.player);
  }

}
