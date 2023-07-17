import { useRoom } from '@/components/providers';
import RoomCode from './roomCode/roomCode';

const RoomHeader = () => {
  const { room } = useRoom();

  if (!room) return null;
  const { name, isStarted } = room;

  return (
    <header>
      <h1>{name}</h1>
      <RoomCode />
      <p>
        Game Status: {isStarted && <span>(Game Started)</span>}{' '}
        {!isStarted && <span>(Waiting for host...)</span>}
      </p>
    </header>
  );
};

export default RoomHeader;
