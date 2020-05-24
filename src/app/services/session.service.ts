import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player } from '../model/player';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private playerSource = new BehaviorSubject<Player>(null);
  player = this.playerSource.asObservable();
  updatePlayer(player:Player) {
    if (this.gameSource.value)
    {
      let game = this.gameSource.value;
      let index = game.players.find(z => z.id == player.id);
      index = player;
      this.gameSource.next(game);
    }
    this.playerSource.next(player);
  }

  private gameSource = new BehaviorSubject<Game>(null);
  game = this.gameSource.asObservable();
  updateGame(game:Game) {
    this.gameSource.next(game);
  }
  
  constructor() { }
}
