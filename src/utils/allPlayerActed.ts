import { Player } from '@/data/types';

export const allPlayersActed = (players: Player[]): boolean => {
  return players.every((player) => player.hasActed || player.isFolded);
};
