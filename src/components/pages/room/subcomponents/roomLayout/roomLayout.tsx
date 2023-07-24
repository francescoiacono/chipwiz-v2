import PlayerInfo from './playerInfo/playerInfo';
import RoomHeader from './roomHeader/roomHeader';
import styles from './roomLayout.module.css';
import RoomStats from './roomStats/roomStats';
import PlayerList from './playerList/playerList';
import { Player } from '@/data/types';

interface RoomLayoutProps {
  player: Player;
}

const RoomLayout = ({ player }: RoomLayoutProps) => {
  return (
    <main className={styles.wrapper}>
      <RoomHeader />
      <div className={styles.gameInfo}>
        <div className={styles.settings}>
          <RoomStats />
          <PlayerInfo player={player} />
        </div>
        <PlayerList />
      </div>
    </main>
  );
};

export default RoomLayout;
