import { Player, Pot } from '@/data/types';

export const usePot = () => {
  const addPot = (activePlayers: Player[]) => {
    const newPot: Pot = {
      amount: 0,
      possibleWinners: activePlayers,
    };

    return newPot;
  };

  const distributePot = (
    players: Player[],
    winnerId: string,
    totalPot: number
  ): Player[] => {
    const winnerPlayer = players.find((player) => player.id === winnerId);
    const winnerBet = winnerPlayer ? winnerPlayer.totalBet : 0;
    const updatedPlayers = [...players];

    if (!winnerPlayer) {
      throw new Error('Winner not found');
    }

    // Finding the winner and updating their chip count
    if (winnerPlayer?.potentialWin > totalPot) {
      return updatedPlayers.map((player) => {
        if (player.id === winnerId) {
          player.chips += totalPot;
        }
        return player;
      });
    } else {
      updatedPlayers.map((player) => {
        if (player.id === winnerId) {
          player.chips += winnerPlayer.potentialWin;
        }
        return player;
      });

      // Distributing remaining pot among the other players based on their original chips
      return updatedPlayers.map((player) => {
        if (player.id === winnerId) {
          return player;
        }
        if (player.initialRoundChips >= winnerBet) {
          player.chips = player.initialRoundChips - winnerBet;
        } else {
          player.chips = 0;
        }
        return player;
      });
    }
  };

  return { addPot, distributePot };
};
