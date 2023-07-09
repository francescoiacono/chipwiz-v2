export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  chips: number;
  isTurn: boolean;
  isWinner: boolean;
  isBusted: boolean;
  isFolded: boolean;
  isAllIn: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
}
