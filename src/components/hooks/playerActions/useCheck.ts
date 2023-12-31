import { Room } from '@/data/types';
import { updateRoom } from '@/services';
import { getNextPlayerTurnInGame } from '@/utils';

export const useCheck = () => {
  const check = async (room: Room) => {
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    // 1. Find current player where room.current turn is equal to player index
    const currentPlayer = players[room.currentTurn];

    // 2. Update player hasActed
    currentPlayer.hasActed = true;

    // 3. Update room turn
    updatedRoom.currentTurn = getNextPlayerTurnInGame(
      players,
      updatedRoom.currentTurn
    );

    // 4. Update room
    await updateRoom(updatedRoom.id, updatedRoom);
  };

  return { check };
};
