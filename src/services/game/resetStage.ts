import { Room, Stage } from '@/data/types';
import { getDealerNextTurn } from '@/utils';

export const resetStage = (room: Room) => {
  const updatedRoom = { ...room };
  const { players } = updatedRoom;

  // 1. Update stage
  updatedRoom.stage = Stage.PREFLOP;

  // 2. Update players
  players.forEach((player) => {
    player.currentBet = 0;
    player.isFolded = false;
    player.isAllIn = false;
    player.hasActed = false;
    player.isWinner = false;
  });

  // 3. Update room highest bet
  updatedRoom.highestBet = 0;

  // 4. Update turn to next possible dealer
  updatedRoom.currentTurn = getDealerNextTurn(players);

  return updatedRoom;
};
