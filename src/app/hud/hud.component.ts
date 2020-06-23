import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { Game, Team, Role } from '@manwaring-games/codenames-common';
import { faBullhorn, faLink } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HudComponent implements OnInit {

  faBullhorn = faBullhorn;
  faLink = faLink;
  game: Game;
  Team = Team;
  Role = Role;
  dummyForm: FormGroup = new FormGroup({});

  constructor(
    private gameStateService: GameStateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.gameStateService.game$.subscribe(game => {
      this.game = game;
    });
  }

  onGameCodeLinkClick() {
    let linkHost = window.location.href.replace(window.location.pathname, '');
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${linkHost}/join/${this.game.code}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('Sharing link copied to clipboard');
  }

}
