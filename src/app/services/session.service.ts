import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  personId: string;
  updatePerson(person:Person) {
      let game = this.gameSource.value;
      let index = game.people.find(z => z.id == this.personId);
      index = person;
      this.gameSource.next(game);
  }

  private gameSource = new BehaviorSubject<Game>(null);
  game = this.gameSource.asObservable();
  updateGame(game:Game) {
    this.gameSource.next(game);
  }
  
  constructor() { }
}
