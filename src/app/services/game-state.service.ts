import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Game, Person, Role, Team } from '@manwaring-games/codenames-common';
import { Router } from '@angular/router';
import * as MurmurHash3 from 'imurmurhash';
import { BehaviorSubject } from 'rxjs';
import { GameDetails } from '../model/game-details';

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
        this.checkGameForChanges(game);
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
  private gameDetails = new BehaviorSubject<GameDetails>(null);
  gameDetails$ = this.gameDetails.asObservable();

  private checkGameForChanges(newGame: Game) {
    const newGameHash = MurmurHash3(JSON.stringify(newGame)).result();

    if (this.prevGameHash == null || this.prevGameHash != newGameHash) {
      this.checkGameForNavigation(newGame);
      this.prevGameHash = newGameHash;
      this.prevGame = newGame;
      this.setGameDetails(newGame);
    }
  }

  private setGameDetails(game: Game) {
    let person = this.person;

    let gameDetails = new GameDetails();
    gameDetails.isUserSpymaster = person.role == Role.SPYMASTER;
    if (game.turns != null) {
      gameDetails.isUserTurn = game.turns.active == null ?
        game.startTeam == person.team : game.turns.active.team == person.team;
      gameDetails.canUserTakeAction = gameDetails.isUserTurn
        && ((gameDetails.isUserSpymaster && game.turns.active == null)
          || (gameDetails.isUserSpymaster && game.turns.active != null && game.turns.active.clue == null)
          || (!gameDetails.isUserSpymaster && game.turns.active != null && game.turns.active.clue != null));
      gameDetails.canSpymasterTakeAction = game.turns.active == null || game.turns.active.clue == null;
      gameDetails.currentTeam = game.turns.active == null ? game.startTeam : game.turns.active.team;
    }
    if (game.tiles != null) {
      gameDetails.blueTeamGuessed = game.tiles.filter(z => z.team == Team.BLUE && z.selected).length;
      gameDetails.blueTeamGoal = game.tiles.filter(z => z.team == Team.BLUE).length;
      gameDetails.redTeamGuessed = game.tiles.filter(z => z.team == Team.RED && z.selected).length;
      gameDetails.redTeamGoal = game.tiles.filter(z => z.team == Team.RED).length;
    }
    console.log(game);
    console.log(gameDetails);
    this.gameDetails.next(gameDetails);
  }

  private checkGameForNavigation(newGame: Game) {
    if (this.prevGame && this.prevGame.id == newGame.id) {
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
}
