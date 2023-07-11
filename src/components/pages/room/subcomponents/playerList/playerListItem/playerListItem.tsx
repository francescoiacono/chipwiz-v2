import PlayerButton, {
  ButtonType,
} from '@/components/ui/playerButton/playerButton';
import styles from './playerListItem.module.css';
import { Player } from '@/data/types';
import { useRoom } from '@/components/providers';

interface PlayerListItemProps {
  player: Player;
}

const PlayerListItem = ({ player }: PlayerListItemProps) => {
  return (
    <li className={styles.listItem}>
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
