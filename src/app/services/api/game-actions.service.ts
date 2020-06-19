import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './base-service';
import { ApiConfiguration } from './api-configuration';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from '../session.service';
import { Game, Team } from '@manwaring-games/codenames-common';

@Injectable({
  providedIn: 'root'
})
export class GameActionsService extends BaseService {

  constructor(
    config: ApiConfiguration,
    http: HttpClient,
    private sessionService: SessionService
  ) {
    super(config, http);
  }

  startGame(): Observable<Game> {
    return this.http.post<Game>(`${this.rootUrl}/games/${this.sessionService.game.id}/start`, null).pipe(
      tap(game => {
        this.sessionService.game = game;
      })
    );
  }

  startTurn(numGuesses:number, team:Team): Observable<Game> {
    let body = {
      word: '',
      tiles: numGuesses,
      team: team
    };
    return this.http.post<Game>(`${this.rootUrl}/games/${this.sessionService.game.id}/turns`, body).pipe(
      tap(game => {
        this.sessionService.game = game;
      })
    );
  }

}
