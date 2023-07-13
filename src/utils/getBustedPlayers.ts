import { Player } from '@/data/types';

export const getBustedPlayers = (players: Player[]): Player[] => {
  return players.filter((player) => player.isBusted);
};
