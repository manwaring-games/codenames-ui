import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { BaseService } from './base-service';
import { ApiConfiguration } from './api-configuration';
import { Observable } from 'rxjs';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { CreatePersonRequest } from 'src/app/model/create-person-request';

@Injectable({
  providedIn: 'root'
})
export class GameSetupService extends BaseService {

  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  readonly gamesPath = '/games';

  newGame(createPersonRequest:CreatePersonRequest): Observable<Game> {
    return this.http.post<Game>(`${this.rootUrl}${this.gamesPath}`, createPersonRequest);
  }

}
