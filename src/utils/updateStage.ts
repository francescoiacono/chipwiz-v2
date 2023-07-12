import { Stage } from '@/data/types';

export const updateStage = (stage: Stage): Stage => {
  switch (stage) {
    case Stage.PREFLOP:
      return Stage.FLOP;
    case Stage.FLOP:
      return Stage.TURN;
    case Stage.TURN:
      return Stage.RIVER;
    case Stage.RIVER:
      return Stage.SHOWDOWN;
    case Stage.SHOWDOWN:
      return Stage.PREFLOP;
    default:
      return Stage.PREFLOP;
  }
};
