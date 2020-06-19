import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Person, Game, Team, Role } from '@manwaring-games/codenames-common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  person: Person
  game: Game
  Team = Team;
  Role = Role;
  numGuesses = new FormControl('');

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.game$.subscribe(game => {
      this.game = game;
      this.person = game.people.find(z => z.id == this.sessionService.personId);
    })
  }

  onSubmitGuessesClick() {
    window.alert(this.numGuesses.value);
  }

}
