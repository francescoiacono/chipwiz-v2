import RoomCode from './roomCode/roomCode';
import styles from './roomHeader.module.css';
import { useRoom } from '@/components/providers';

const RoomHeader = () => {
  const { room } = useRoom();

  if (!room) return null;
  const { name, isStarted } = room;

  return (
    <header className={styles.header}>
      <h1>{name}</h1>
      <RoomCode />
      <p>
        {isStarted && <span>(Game Started)</span>}{' '}
        {!isStarted && <span>(Waiting for host...)</span>}
      </p>
    </header>
  );
};

export default RoomHeader;
