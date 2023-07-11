import { Player, Role } from '@/data/types';

export const isPlayerHost = (player: Player) => {
  return player.role === Role.HOST;
};
