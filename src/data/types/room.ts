import { Player, Stage } from '.';

export interface Room {
  id: string;
  name: string;
  players: Player[];
  initialChips: number;
  smallBlind: number;
  bigBlind: number;
  pot: number;
  highestBet: number;
  stage: Stage;
  currentTurn: number;
  isStarted: boolean;
  isFinished: boolean;
}
