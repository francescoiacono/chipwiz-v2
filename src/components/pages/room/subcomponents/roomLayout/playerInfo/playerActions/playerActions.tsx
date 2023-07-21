import RaiseAction from './raiseAction/raiseAction';
import CallAction from './callAction/callAction';
import CheckAction from './checkAction/checkAction';
import FoldAction from './foldAction/foldAction';
import NewHandAction from './newHandAction/newHandAction';
import { useRoom } from '@/components/providers';
import { Player, Room, Stage } from '@/data/types';

import styles from './playerActions.module.css';
import BuyInAction from './buyInAction/buyInAction';

interface PlayerActionsProps {
  player: Player;
  room: Room;
}

const PlayerActions = ({ player, room }: PlayerActionsProps) => {
  const { highestBet, stage, players, currentTurn, isStarted } = room;

  const isTurn = () => {
    return players[currentTurn].id === player.id;
  };

  const canRaise = player.chips > highestBet;
  const canCall = player.stageBet < highestBet;
  const canCheck = player.stageBet >= highestBet || highestBet === 0;

  return (
    <section className={styles.wrapper}>
      {isTurn() ? <h4>Your Turn!</h4> : <h3>Waiting for other players...</h3>}

      {player.isBusted && (
        <>
          <h3>You{`'`}re busted!</h3>
          <BuyInAction player={player} />
        </>
      )}

      {stage !== Stage.SHOWDOWN && isStarted && (
        <div className={styles.buttons}>
          {canCall && <CallAction disabled={!isTurn()} />}
          {canCheck && <CheckAction disabled={!isTurn()} />}
          {canRaise && <RaiseAction disabled={!isTurn()} />}
          <FoldAction disabled={!isTurn()} />
        </div>
      )}
      <NewHandAction player={player} room={room} />
    </section>
  );
};

export default PlayerActions;
