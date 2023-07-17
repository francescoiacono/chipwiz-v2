import PlayerButton, {
  ButtonType,
} from '@/components/ui/playerButton/playerButton';
import styles from './playerListItem.module.css';
import { Player } from '@/data/types';

interface PlayerListItemProps {
  player: Player;
  active?: boolean;
}

const PlayerListItem = ({ player, active }: PlayerListItemProps) => {
  return (
    <li
      className={
        active ? `${styles.listItem} ${styles.active}` : styles.listItem
      }
    >
      {player.name}{' '}
      <div className={styles.buttons}>
        {player.isDealer && <PlayerButton type={ButtonType.Dealer} />}
        {player.isSmallBlind && <PlayerButton type={ButtonType.SmallBlind} />}
        {player.isBigBlind && <PlayerButton type={ButtonType.BigBlind} />}
      </div>
    </li>
  );
};

export default PlayerListItem;
