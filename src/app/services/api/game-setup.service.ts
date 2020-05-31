import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { BaseService } from './base-service';
import { ApiConfiguration } from './api-configuration';
import { Observable } from 'rxjs';
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
    return this.http.post<Game>(`${this.rootUrl}/games`, body);
  }

  joinGame(code: string, username: string): Observable<Game> {
    const body = {name: username}
    return this.http.post<Game>(`${this.rootUrl}/games/${code}/people`, body);
  }

  changeTeam(newTeam:Team): Observable<Game> {
    return this.http.put<Game>(`${this.rootUrl}/games/${this.sessionService.getGame().id}/people/${this.sessionService.personId}/teams/${newTeam}`, null);
  }

}