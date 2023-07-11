import { useRoom } from '@/components/providers';
import { Player } from '@/data/types';

const RoomInfo = () => {
  const { room } = useRoom();

  return (
    <>
      {room && (
        <div>
          <h1>{room.name}</h1>
          <p>Room Pot: {room.pot}</p>
          <p>
            Blinds: {room.smallBlind} / {room.bigBlind}
          </p>
          <p>Players in the room:</p>
          <ul>
            {room.players.map((player: Player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
          <p>{`Player's Turn: ${room.players[room.currentTurn].name}`}</p>
        </div>
      )}
    </>
  );
};

export default RoomInfo;
