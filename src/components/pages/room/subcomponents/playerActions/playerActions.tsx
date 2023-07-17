import { useRoom } from '@/components/providers';
import RaiseAction from './raiseAction/raiseAction';
import CallAction from './callAction/callAction';
import CheckAction from './checkAction/checkAction';
import FoldAction from './foldAction/foldAction';

import styles from './playerActions.module.css';

interface PlayerActionsProps {
  disabled?: boolean;
}

const PlayerActions = ({ disabled }: PlayerActionsProps) => {
  const { room } = useRoom();

  if (!room) return null;

  const { players, currentTurn, highestBet, winner } = room;
  const currentPlayer = players[currentTurn];

  const canRaise = currentPlayer.chips > highestBet;
  const canCall = currentPlayer.stageBet < highestBet;
  const canCheck = currentPlayer.stageBet >= highestBet || highestBet === 0;

  return (
    <section className={styles.actionsWrapper}>
      {!winner && (
        <>
          {canCall && <CallAction disabled={disabled} />}
          {canCheck && <CheckAction disabled={disabled} />}
          {canRaise && <RaiseAction disabled={disabled} />}
          <FoldAction disabled={disabled} />
        </>
      )}
    </section>
  );
};

export default PlayerActions;
