import { Player } from './player';

export interface Session {
  sessionId: string;
  playerId: Player['id'];
}
