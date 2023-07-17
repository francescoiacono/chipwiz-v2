import { Player, Pot, Stage } from '.';

export interface Room {
  id: string;
  name: string;
  players: Player[];
  winner: Player | null;
  initialChips: number;
  smallBlind: number;
  bigBlind: number;
  pots: Pot[];
  currentPot: number;
  highestBet: number;
  stage: Stage;
  currentTurn: number;
  roundStart: number;
  isStarted: boolean;
  isFinished: boolean;
  allInPlayers: number;
}
