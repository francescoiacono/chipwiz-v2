import { Player } from '@/data/types';

export const canPlayersStillBet = (players: Player[], highestBet: number) => {
  let canBet = false;

  const bettingPlayers = players.map((player) => {
    if (!player.isFolded && !player.isAllIn && player.chips > highestBet) {
      return player;
    }
  });

  if (bettingPlayers.length > 2) {
    canBet = true;
  }

  return canBet;
};
