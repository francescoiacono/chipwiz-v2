import { Player } from '@/data/types';

export const getNextPlayerTurn = (players: Player[], currentTurn: number) => {
  const playersCount = players.length;
  let nextTurn = (currentTurn + 1) % playersCount;

  // Check if all players are all-in, folded, or busted
  if (
    players.every(
      (player) => player.isFolded || player.isAllIn || player.isBusted
    )
  ) {
    return 0;
  }

  // Iterate until finding a player who is still in game
  while (
    players[nextTurn].isFolded ||
    players[nextTurn].isAllIn ||
    players[nextTurn].isBusted
  ) {
    nextTurn = (nextTurn + 1) % playersCount;
  }

  return nextTurn;
};

export const getDealerNextTurn = (players: Player[]): number => {
  const dealer = players.find((player) => player.isDealer);
  if (dealer) {
    const dealerIndex = players.indexOf(dealer);
    return getNextPlayerTurn(players, dealerIndex);
  }

  return 0;
};
