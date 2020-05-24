import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { Team } from '../model/team';
import { faCrown, faBullhorn } from '@fortawesome/free-solid-svg-icons';

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
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.game.subscribe(game => {
      this.game = game;
      this.player = game.players.find(z => z.id == this.sessionService.playerId);
    })
  }

  onTeamSelect(team:Team) {
    this.player.team = team;
    this.sessionService.updatePlayer(this.player);
  }

  onWordMasterSelect() {
    this.game.players.forEach(z => {
      if (z.team == this.player.team) {
        if (z.id == this.player.id) {
          z.isWordMaster = true;
        }
        else {
          z.isWordMaster = false;
        }
      }
    });
    this.sessionService.updateGame(this.game);
  }

}
