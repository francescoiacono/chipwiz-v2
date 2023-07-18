import { Room } from '@/data/types';
import { updateRoom } from '@/services';
import { getNextPlayerTurnInGame } from '@/utils';

export const useCall = () => {
  const call = async (room: Room) => {
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 1. Find current player where room.current turn is equal to player index
    const currentPlayer = players[room.currentTurn];

    // 2. Calculate the amount to call
    const amountToCall = updatedRoom.highestBet - currentPlayer.stageBet;

    // 3. If there is an amount to call
    if (amountToCall > 0) {
      // 3a. But the player has less chips than the amount to call, then go all in
      if (currentPlayer.chips < amountToCall) {
        console.log('Changing Total Bet to', currentPlayer.chips);
        currentPlayer.totalBet += currentPlayer.chips;
        currentPlayer.stageBet += currentPlayer.chips;
        currentPlayer.chips = 0;
        currentPlayer.isAllIn = true;
        currentPlayer.hasActed = true;

        updatedRoom.pots[updatedRoom.currentPot].amount +=
          currentPlayer.stageBet;
      }
      // 3b. Else, call the amount
      else {
        currentPlayer.hasActed = true;
        currentPlayer.totalBet += amountToCall;
        currentPlayer.stageBet += amountToCall;
        currentPlayer.chips -= amountToCall;
        updatedRoom.pots[updatedRoom.currentPot].amount += amountToCall;
      }

      // 3c. Update room turn
      updatedRoom.currentTurn = getNextPlayerTurnInGame(
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
