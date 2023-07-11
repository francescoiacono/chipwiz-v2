import { useRoom } from '@/components/providers';
import PlayerList from '../playerList/playerList';

const RoomInfo = () => {
  const { room } = useRoom();

  return (
    <>
      {room && (
        <div>
          <div>
            <h1>{room.name}</h1>
            <p>
              Game Status:{' '}
              {room.isStarted ? (
                <span>(Game Started)</span>
              ) : (
                <span>(Waiting...)</span>
              )}
            </p>
          </div>
          <p>Room Pot: {room.pot}</p>
          <p>
            Blinds: {room.smallBlind} / {room.bigBlind}
          </p>

          <PlayerList />
          <p>{`Player's Turn: ${room.players[room.currentTurn].name}`}</p>
        </div>
      )}
    </>
  );
};

export default RoomInfo;
