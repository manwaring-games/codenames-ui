import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Game, Person } from '@manwaring-games/codenames-common';
import { Router } from '@angular/router';

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
  game$ = this.sessionService.game$;
  get game(): Game {
    return this.sessionService.game;
  }

  private checkGameForRelevantChanges(newGame: Game) {
    if (this.prevGame && this.prevGame.id == newGame.id)
    {
      if (!this.prevGame.started && newGame.started) {
        this.router.navigate(['/game']);
      }
    } else if (newGame.started == false) {
      this.router.navigate(['/lobby']);
    }

    this.prevGame = newGame;
  }
}
