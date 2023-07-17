import { Player } from '@/data/types';

export const getAllPlayersIds = (players: Player[]) => {
  return players.map((player) => player.id);
};

export const findPlayerById = (players: Player[], id: Player['id']) => {
  return players.find((player) => player.id === id);
};
