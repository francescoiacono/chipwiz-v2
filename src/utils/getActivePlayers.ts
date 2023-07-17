import { Player } from '@/data/types';

/**
 *
 * @param players
 * @returns {Player[]} - Returns an array of players that are not folded or busted
 */

export const getActivePlayers = (players: Player[]) => {
  return players.filter((player) => !player.isFolded);
};

export const getAllInPlayers = (players: Player[]) => {
  return players.filter((player) => player.isAllIn);
};
