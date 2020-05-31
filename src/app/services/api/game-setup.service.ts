import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { BaseService } from './base-service';
import { ApiConfiguration } from './api-configuration';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { CreatePersonRequest } from 'src/app/model/create-person-request';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class GameSetupService extends BaseService {

  constructor(
    config: ApiConfiguration,
    http: HttpClient,
    private sessionService: SessionService
  ) {
    super(config, http);
  }

  newGame(username: string): Observable<Game> {
    const body = {name: username}
    return this.http.post<Game>(`${this.rootUrl}/games`, body).pipe(
      tap(game => {
        this.sessionService.personId = game.people[0].id;
        this.sessionService.updateGame(game);
      })
    );
  }

  joinGame(code: string, username: string): Observable<Game> {
    const body = {name: username}
    return this.http.post<Game>(`${this.rootUrl}/games/${code}/people`, body).pipe(
      tap(game => {
        let person = game.people.find(z => z.name == username);
        this.sessionService.personId = person.id;
        this.sessionService.updateGame(game);
      })
    );
  }

  changeTeam(newTeam:Team): Observable<Game> {
    return this.http.put<Game>(`${this.rootUrl}/games/${this.sessionService.getGame().id}/people/${this.sessionService.personId}/teams/${newTeam}`, null).pipe(
      tap(game => {
        this.sessionService.updateGame(game);
      })
    );
  }

  changeRole(newRole:Role): Observable<Game> {
    return this.http.put<Game>(`${this.rootUrl}/games/${this.sessionService.getGame().id}/people/${this.sessionService.personId}/roles/${newRole}`, null).pipe(
      tap(game => {
        this.sessionService.updateGame(game);
      })
    );
  }

}
