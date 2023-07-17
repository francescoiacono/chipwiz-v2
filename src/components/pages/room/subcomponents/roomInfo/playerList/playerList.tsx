import { useRoom } from '@/components/providers';
import styles from './playerList.module.css';
import PlayerListItem from './playerListItem/playerListItem';

const PlayerList = () => {
  const { room } = useRoom();

  if (!room) return null;

  const { players, currentTurn } = room;

  return (
    <section className={styles.listWrapper}>
      <h2 className={styles.listDescription}>Players in the room:</h2>
      <ul className={styles.list}>
        {room.players.map((player) => {
          if (player.id === players[currentTurn].id) {
            return <PlayerListItem key={player.id} active player={player} />;
          } else {
            return <PlayerListItem key={player.id} player={player} />;
          }
        })}
      </ul>
    </section>
  );
};

export default PlayerList;
