import { useRoom } from '@/components/providers';
import { useCall, useCheck, useFold } from '@/components/hooks/playerActions';
import Button from '@/components/ui/button/button';
import styles from './playerActions.module.css';
import RaiseAction from './raiseAction/raiseAction';

interface PlayerActionsProps {
  disabled?: boolean;
}

const PlayerActions = ({ disabled }: PlayerActionsProps) => {
  const { room } = useRoom();

  const { call } = useCall();
  const { check } = useCheck();
  const { fold } = useFold();

  const handleCall = async () => {
    if (room) await call(room);
  };

  const handleCheck = async () => {
    if (room) await check(room);
  };

  const handleFold = async () => {
    if (room) await fold(room);
  };

  if (!room) return null;

  const { players, currentTurn, highestBet } = room;
  const currentPlayer = players[currentTurn];

  const canRaise = currentPlayer.chips > highestBet;
  const canCall = currentPlayer.currentBet < highestBet;
  const canCheck = currentPlayer.currentBet >= highestBet || highestBet === 0;

  return (
    <section className={styles.actionsWrapper}>
      {canCall && (
        <Button disabled={disabled} onClick={handleCall}>
          Call
        </Button>
      )}
      {canCheck && (
        <Button disabled={disabled} onClick={handleCheck}>
          Check
        </Button>
      )}
      {canRaise && <RaiseAction disabled={disabled} />}
      <Button disabled={disabled} onClick={handleFold}>
        Fold
      </Button>
    </section>
  );
};

export default PlayerActions;
