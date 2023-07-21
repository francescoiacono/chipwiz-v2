import { Player, Room } from '@/data/types';
import { updateRoom } from '@/services';

export const useBuyIn = () => {
  const buyIn = async (room: Room, player: Player) => {
    const updatedRoom = { ...room };
    const { players } = updatedRoom;

    const currentPlayer = players.find((p) => p.id === player.id);

    if (currentPlayer) {
      currentPlayer.chips = updatedRoom.initialChips;
      currentPlayer.isBusted = false;
      currentPlayer.isAllIn = false;
      currentPlayer.stageBet = 0;
      currentPlayer.totalBet = 0;
      currentPlayer.isFolded = false;
    }

    await updateRoom(updatedRoom.id, updatedRoom);
  };

  return { buyIn };
};
