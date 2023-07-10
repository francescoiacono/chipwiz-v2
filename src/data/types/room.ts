import { Game, Player } from '.';

export interface Room {
  id: string;
  name: string;
  players: Player[];
  initialChips: number;
  game: Game;
  isStarted: boolean;
  isFinished: boolean;
}
