import { Player } from '@/data/types';

const getNextTurn = (
  players: Player[],
  currentTurn: number,
  checkFn: (player: Player) => boolean
): number => {
  const playersCount = players.length;
  let nextTurn = (currentTurn + 1) % playersCount;

  // Check if all players satisfy the provided check function
  if (players.every(checkFn)) {
    return 0;
  }

  // Iterate until finding a player who does not satisfy the check function
  while (checkFn(players[nextTurn])) {
    nextTurn = (nextTurn + 1) % playersCount;
  }

  return nextTurn;
};

export const getNextPlayerTurnInGame = (
  players: Player[],
  currentTurn: number
) => {
  const checkFn = (player: Player) =>
    player.isFolded || player.isAllIn || player.isBusted;
  return getNextTurn(players, currentTurn, checkFn);
};

export const getNextPlayerTurnStart = (
  players: Player[],
  currentTurn: number
) => {
  const checkFn = (player: Player) => player.isBusted;
  return getNextTurn(players, currentTurn, checkFn);
};

export const getDealerNextTurn = (players: Player[]): number => {
  const dealer = players.find((player) => player.isDealer);
  if (dealer) {
    const dealerIndex = players.indexOf(dealer);
    return getNextPlayerTurnStart(players, dealerIndex);
  }

  return 0;
};
