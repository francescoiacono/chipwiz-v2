import { Player } from '@/data/types';

export const getPlayersInGame = (players: Player[]) => {
  return players.filter(
    (player) => !player.isFolded && !player.isBusted && !player.isAllIn
  );
};
