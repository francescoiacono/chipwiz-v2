import PlayerList from '../playerList/playerList';
import RoomPot from './roomPot/roomPot';
import RoomSettings from './roomSettings/roomSettings';
import styles from './roomStats.module.css';

const RoomStats = () => {
  return (
    <>
      <section className={styles.stats}>
        <RoomSettings />
        <RoomPot />
      </section>
    </>
  );
};

export default RoomStats;
