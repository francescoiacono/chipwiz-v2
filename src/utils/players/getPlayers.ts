import { Player } from '@/data/types';

/**
 *
 * @param players
 * @returns {Player[]} - Returns an array of players that are not folded
 *
 **/

export const getActivePlayers = (players: Player[]) => {
  return players.filter((player) => !player.isFolded);
};

/**
 *
 * @param players
 * @returns {Player[]} - Returns an array of players that are currently all-in
 *
 **/

export const getAllInPlayers = (players: Player[]) => {
  return players.filter((player) => player.isAllIn);
};

/**
 *
 * @param players
 * @returns {Player[]} - Returns an array of players that are currently busted
 *
 **/

export const getBustedPlayers = (players: Player[]): Player[] => {
  return players.filter((player) => player.isBusted);
};
