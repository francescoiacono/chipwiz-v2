import { Player } from './player';

export interface Pot {
  amount: number;
  possibleWinners: Player[];
}
