import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player } from '../model/player';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  playerId: string;
  updatePlayer(player:Player) {
      let game = this.gameSource.value;
      let index = game.players.find(z => z.id == this.playerId);
      index = player;
      this.gameSource.next(game);
  }

  private gameSource = new BehaviorSubject<Game>(null);
  game = this.gameSource.asObservable();
  updateGame(game:Game) {
    this.gameSource.next(game);
  }
  
  constructor() { }
}
