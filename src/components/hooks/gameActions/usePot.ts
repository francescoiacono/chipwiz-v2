import { Player, Pot, Room } from '@/data/types';
import { getAllPlayersIds } from '@/utils';

export const usePot = () => {
  const addPot = (activePlayers: Player[]) => {
    const newPot: Pot = {
      amount: 0,
      possibleWinners: activePlayers,
    };

    return newPot;
  };

  return { addPot };
};
