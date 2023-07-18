import { Player, Room, Stage } from '@/data/types';

/**
 *
 * @param updatedRoom
 * current room state
 *
 * @param activePlayers
 * players who are still in the game (not folded)
 * @returns
 * It return an updated room with the last in game player as the winner
 *
 **/

export const endHandWithWinner = (
  updatedRoom: Room,
  activePlayers: Player[]
) => {
  updatedRoom.stage = Stage.SHOWDOWN;
  updatedRoom.winner = activePlayers[0];
  updatedRoom.isStarted = false;

  // Update winner status
  updatedRoom.players = updatedRoom.players.map((player) => {
    const totalPot = updatedRoom.pots.reduce((acc, pot) => {
      return acc + pot.amount;
    }, 0);

    if (player.id === activePlayers[0].id) {
      return {
        ...player,
        chips: totalPot + player.chips,
      };
    } else {
      return player;
    }
  });

  return updatedRoom;
};
