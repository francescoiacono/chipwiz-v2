import { useRoom } from '@/components/providers';
import styles from './playerList.module.css';
import PlayerListItem from './playerListItem/playerListItem';
import VerticalPanel from '@/components/ui/verticalPanel/verticalPanel';

const PlayerList = () => {
  const { room } = useRoom();

  if (!room) return null;

  const { players, currentTurn } = room;

  return (
    <VerticalPanel title='Player List'>
      <section className={styles.listWrapper}>
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
    </VerticalPanel>
  );
};

export default PlayerList;
