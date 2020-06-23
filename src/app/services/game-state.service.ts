import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Game, Person } from '@manwaring-games/codenames-common';
import { Router } from '@angular/router';
import * as MurmurHash3 from 'imurmurhash';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor(
    private sessionService:SessionService,
    private router:Router
  ) {
    this.prevGame = sessionService.game;
    sessionService.game$.subscribe(game => {
      if (game) {
        this.checkGameForRelevantChanges(game);
      }
    });
  }

  get person(): Person {
    return this.game.people.find(z => z.id == this.sessionService.personId);
  }
  private prevGame: Game;
  private prevGameHash: number;
  game$ = this.sessionService.game$;
  get game(): Game {
    return this.sessionService.game;
  }

  private checkGameForRelevantChanges(newGame: Game) {
    const newGameHash = MurmurHash3(JSON.stringify(newGame)).result();

    if (this.prevGameHash == null || this.prevGameHash != newGameHash) {
      if (this.prevGame && this.prevGame.id == newGame.id)
      {
        if (!this.prevGame.started && newGame.started) {
          if (!window.location.pathname.includes('/game')) {
            this.router.navigate(['/game']);
          }
        }
      } else if (newGame.started == false) {
        if (!window.location.pathname.includes('/lobby')) {
          this.router.navigate(['/lobby']);
        }
      }
    }

    this.prevGameHash = newGameHash;
    this.prevGame = newGame;
  }
}
