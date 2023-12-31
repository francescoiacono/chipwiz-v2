import { Room } from '@/data/types';
import { updateRoom } from '@/services';
import { getNextPlayerTurnInGame } from '@/utils';

export const useFold = () => {
  const fold = async (room: Room) => {
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 1. Find current player where room.current turn is equal to player index
    const currentPlayer = players[room.currentTurn];

    // 2. Update player isFolded
    currentPlayer.isFolded = true;

    // 3. Update room turn
    updatedRoom.currentTurn = getNextPlayerTurnInGame(
      players,
      updatedRoom.currentTurn
    );

    updatedRoom.pots = updatedRoom.pots.map((pot) => {
      pot.possibleWinners = pot.possibleWinners.filter(
        (player) => player.id !== currentPlayer.id
      );
      return pot;
    });

    // 4. Update room
    await updateRoom(updatedRoom.id, updatedRoom);
  };

  return { fold };
};
