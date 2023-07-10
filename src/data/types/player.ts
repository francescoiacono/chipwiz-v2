export interface Player {
  id: string;
  name: string;
  chips: number;
  currentBet: number;
  role: Role;
  isTurn: boolean;
  isWinner: boolean;
  isBusted: boolean;
  isFolded: boolean;
  isAllIn: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
}

export enum Role {
  HOST = 'host',
  PLAYER = 'player',
}
