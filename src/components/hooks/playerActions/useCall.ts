import { Room } from '@/data/types';
import { updateRoom } from '@/services';
import { getNextPlayerTurn } from '@/utils';

export const useCall = () => {
  const call = async (room: Room) => {
    console.log('[CALLING]');
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 1. Find current player where room.current turn is equal to player index
    const currentPlayer = players[room.currentTurn];

    // 2. Calculate the amount to call
    const amountToCall = updatedRoom.highestBet - currentPlayer.currentBet;

    // 3. If there is an amount to call
    if (amountToCall > 0) {
      // 3a. But the player has less chips than the amount to call, then go all in
      if (currentPlayer.chips < amountToCall) {
        currentPlayer.currentBet += currentPlayer.chips;
        currentPlayer.chips = 0;
        currentPlayer.isAllIn = true;
        currentPlayer.hasActed = true;
        updatedRoom.pot += currentPlayer.currentBet;
      }
      // 3b. Else, call the amount
      else {
        currentPlayer.hasActed = true;
        currentPlayer.currentBet += amountToCall;
        currentPlayer.chips -= amountToCall;
        updatedRoom.pot += amountToCall;
      }

      // 3c. Update room turn
      updatedRoom.currentTurn = getNextPlayerTurn(
        players,
        updatedRoom.currentTurn
      );

      // 3d. Update room
      await updateRoom(updatedRoom.id, updatedRoom);
    }
    // 4. There is no amount to call
  };

  return { call };
};
