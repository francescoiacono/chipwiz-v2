export interface Player {
  id: string;
  name: string;
  role: Role;
  session: string;
  chips: number;
  potentialWin: number;
  initialRoundChips: number;
  totalBet: number;
  stageBet: number;
  hasActed: boolean;
  isBusted: boolean;
  isFolded: boolean;
  isAllIn: boolean;
  isDealer: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
}

export enum Role {
  HOST = 'host',
  PLAYER = 'player',
}
