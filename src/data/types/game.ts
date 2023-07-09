import { Player, Stage } from '.';

export interface Game {
  stage: Stage;
  currentPlayerTurn: Player['id'];
}
