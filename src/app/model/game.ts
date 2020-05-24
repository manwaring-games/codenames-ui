import { Player } from './player';
import { WordCard } from './word-card';
import { Team } from './team';

export class Game {
    redPlayers: Player[];
    bluePlayers: Player[];
    cards: WordCard[];
    id: string;
    turn: Team;
    code: string;
}
