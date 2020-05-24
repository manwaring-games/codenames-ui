import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  player:Player
  game:Game
  
  constructor() { }
}
