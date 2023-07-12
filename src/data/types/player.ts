export interface Player {
  id: string;
  name: string;
  role: Role;
  session: string;
  chips: number;
  currentBet: number;
  hasActed: boolean;
  isWinner: boolean;
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
