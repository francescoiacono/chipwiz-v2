import { useRoom } from '@/components/providers';
import styles from './playerList.module.css';
import PlayerListItem from './playerListItem/playerListItem';

const PlayerList = () => {
  const { room } = useRoom();

  if (!room) return null;

  return (
    <section className={styles.listWrapper}>
      <p className={styles.listDescription}>Players in the room:</p>
      <ul className={styles.list}>
        {room.players.map((player) => (
          <PlayerListItem key={player.id} player={player} />
        ))}
      </ul>
    </section>
  );
};

export default PlayerList;
