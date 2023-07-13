import { Room } from '@/data/types';
import { updateRoom } from '@/services';
import { getNextPlayerTurn } from '@/utils';

export const useRaise = () => {
  const raise = async (raiseAmount: number, room: Room) => {
    console.log(`[RAISING ${raiseAmount}]`);
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 1. Get current player
    const currentPlayer = players[room.currentTurn];

    // 2. Check if player has enough chips
    if (currentPlayer.chips < raiseAmount) {
      throw new Error('Not enough chips');
    }

    // 3. Update all players hasActed to false
    updatedRoom.players = players.map((player) => {
      if (player.id !== currentPlayer.id) {
        return {
          ...player,
          hasActed: false,
        };
      }

      return player;
    });

    // 4. Update round of betting position
    updatedRoom.roundStart = updatedRoom.currentTurn;

    // 5. Update player chips
    currentPlayer.chips -= raiseAmount;

    // 6. Update player current bet and set that player has acted
    currentPlayer.currentBet += raiseAmount;
    currentPlayer.hasActed = true;

    // 7. Update room pot
    updatedRoom.pot += raiseAmount;

    // 8. Update room highest bet
    updatedRoom.highestBet += currentPlayer.currentBet;

    // 9. Updated player isAllIn
    if (currentPlayer.chips <= 0) {
      currentPlayer.isAllIn = true;
    }

    // 10. Update room current turn
    updatedRoom.currentTurn = getNextPlayerTurn(
      players,
      updatedRoom.currentTurn
    );

    // 11. Update room
    await updateRoom(updatedRoom.id, updatedRoom);
  };

  return { raise };
};
