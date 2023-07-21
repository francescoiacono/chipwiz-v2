import PlayerActions from './playerActions/playerActions';
import PlayerStats from './playerStats/playerStats';
import VerticalPanel from '@/components/ui/verticalPanel/verticalPanel';
import RoomWinner from '../roomWinner/roomWinner';
import { Player } from '@/data/types';
import { useRoom } from '@/components/providers';

import styles from './playerInfo.module.css';
import Spinner from '@/components/ui/spinner/spinner';

interface PlayerInfoProps {
  player: Player;
}

const PlayerInfo = ({ player }: PlayerInfoProps) => {
  const { room } = useRoom();

  if (!room) {
    return <Spinner />;
  }

  return (
    <VerticalPanel title='Player Information'>
      <section className={styles.wrapper}>
        <section className={styles.infoContainer}>
          <h2>{player.name}</h2>
          {player.isBusted && <h3>You{`'`}re busted!</h3>}
          <PlayerStats room={room} player={player} />
          <PlayerActions room={room} player={player} />
        </section>
        <RoomWinner />
      </section>
    </VerticalPanel>
  );
};

export default PlayerInfo;
