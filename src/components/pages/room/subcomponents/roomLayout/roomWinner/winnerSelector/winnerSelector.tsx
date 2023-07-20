import Button from '@/components/ui/button/button';
import styles from './winnerSelector.module.css';
import { useRoom } from '@/components/providers';
import { Player } from '@/data/types';

interface WinnerSelectorProps {
  handleWinnerSelection: (player: Player) => void;
  possibleWinners: Player[];
}

const WinnerSelector = ({
  handleWinnerSelection,
  possibleWinners,
}: WinnerSelectorProps) => {
  const { room } = useRoom();

  return (
    <section className={styles.wrapper}>
      <b>Select winner for Pot {room?.pots.length}! </b>
      <ul className={styles.list}>
        {possibleWinners.map((player, i) => {
          if (player.isFolded) {
            return null;
          } else {
            return (
              <li key={i}>
                <Button
                  format='primary'
                  onClick={() => handleWinnerSelection(player)}
                >
                  {player.name}
                </Button>
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
};

export default WinnerSelector;
