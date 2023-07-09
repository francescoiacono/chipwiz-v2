import { Game, Player } from '.';

export interface Room {
  id: string;
  name: string;
  players: Player[];
  game: Game;
  isStarted: boolean;
  isFinished: boolean;
}
