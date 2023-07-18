import { Player } from '@/data/types';

export const calculatePotentialWins = (
  players: Player[]
): Record<string, number> => {
  let potentialWins: Record<string, number> = {};

  for (let i = 0; i < players.length; i++) {
    let potentialWin = players[i].chips + players[i].totalBet;
    for (let j = 0; j < players.length; j++) {
      if (i !== j) {
        potentialWin += Math.min(
          players[i].chips + players[i].totalBet,
          players[j].chips + +players[j].totalBet
        );
      }
    }
    potentialWins[players[i].id] = potentialWin;
  }

  return potentialWins;
};
