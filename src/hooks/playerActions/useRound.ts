import { Room, Stage } from '@/data/types';
import { updateStage } from '@/utils';
import { updateRoom } from '../../services';
import { useCallback } from 'react';
import { getPlayersInGame } from '@/utils/getPlayersInGame';

export const useRound = () => {
  const checkRoundEnd = useCallback(async (room: Room) => {
    // 1. Check if all players have acted
    let updatedRoom = { ...room };
    const { players } = updatedRoom;

    const allPlayersActed = players.every(
      (player) => player.hasActed || player.isFolded
    );

    // 2. If all players have acted, update the stage
    if (allPlayersActed) {
      console.log('ALL PLAYERS ACTED');
      updatedRoom.stage = updateStage(updatedRoom.stage);
      updatedRoom.roundStart = updatedRoom.currentTurn;
      updatedRoom.highestBet = 0;

      // 3. Reset all players' current bets
      updatedRoom.players = players.map((player) => ({
        ...player,
        currentBet: 0,
        hasActed: false,
      }));

      if (getPlayersInGame(players).length === 1) {
        updatedRoom.stage = Stage.SHOWDOWN;
        players[room.currentTurn].isWinner = true;
      }

      // 4. Update room in db
      await updateRoom(updatedRoom.id, updatedRoom)
        .then(() => console.log('Room updated successfully'))
        .catch(() => console.log('Error updating room'));
    }
  }, []);

  return { checkRoundEnd };
};
