import { Room } from '@/data/types';

export const isPlayerTurn = (playerId: string, room: Room) => {
  const { currentTurn } = room;
  return playerId === room.players[currentTurn].id;
};
