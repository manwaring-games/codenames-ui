import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Cookies from 'js-cookie';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';

import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private gameWebSocket: WebSocketSubject<Game>;

  readonly personIdStorageKey = 'personId';
  private _personId: string;
  get personId(): string {
    return this._personId;
  }
  set personId(value: string) {
    Cookies.set(this.personIdStorageKey, value);
    this._personId = value;
    this.trySubscribeToGameUpdates(this.game);
  }

  readonly gameStorageKey = 'game';
  private gameSource = new BehaviorSubject<Game>(null);
  game$ = this.gameSource.asObservable();
  get game(): Game {
    return this.gameSource.value;
  }
  set game(value: Game) {
    Cookies.set(this.gameStorageKey, value);
    this.trySubscribeToGameUpdates(value);
    this.gameSource.next(value);
  }
  
  constructor() {
    let personId = Cookies.get(this.personIdStorageKey);
    if (personId) {
      this._personId = personId;
    }

    let gameString = Cookies.get(this.gameStorageKey);
    if (gameString) {
      let game = JSON.parse(gameString) as Game;
      if (game) {
        this.gameSource.next(game);
      }
    }
    this.trySubscribeToGameUpdates(this.game);
  }

  trySubscribeToGameUpdates(value:Game) {
    if (this.personId && value && (this.game == null || this.game.id != value.id) && this.gameWebSocket == null) {
      const webSocketUrl = `${environment.webSocketRootUrl}?personId=${this.personId}&gameId=${value.id}`;
      this.gameWebSocket = webSocket(webSocketUrl);
      this.gameWebSocket.asObservable().subscribe(result => {
        this.game = result;
      });
    }
  }
}
