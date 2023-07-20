import WinnerTitle from './winnerTitle/winnerTitle';
import WinnerSelector from './winnerSelector/winnerSelector';
import styles from './roomWinner.module.css';
import { useRoom } from '@/components/providers';
import { Player, Stage } from '@/data/types';
import { useHand } from '@/components/hooks/gameActions';

const RoomWinner = () => {
  const { room } = useRoom();
  const { setHandWinner } = useHand();

  // Handle winner selection
  const handleWinnerSelection = async (player: Player) => {
    if (room) {
      await setHandWinner(room, player);
    }
  };

  if (!room) return null;
  const { stage, pots, currentPot } = room;

  // Component
  return (
    <section className={styles.wrapper}>
      {room.winner && <WinnerTitle winner={room.winner} />}
      {!room.winner && stage === Stage.SHOWDOWN && (
        <WinnerSelector
          handleWinnerSelection={handleWinnerSelection}
          possibleWinners={pots[currentPot].possibleWinners}
        />
      )}
    </section>
  );
};

export default RoomWinner;
