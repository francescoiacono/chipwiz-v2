import { useRoom } from '@/components/providers';
import { useRound } from '@/hooks/playerActions/useRound';
import { useEffect } from 'react';
import PlayerList from '../playerList/playerList';

const RoomInfo = () => {
  const { room } = useRoom();
  const { checkRoundEnd } = useRound();

  // TODO: Find a way to get checkRoundEnd to run only once
  useEffect(() => {
    const handleRoundEnd = async () => {
      if (room && room.isStarted) {
        await checkRoundEnd(room);
      }
    };

    handleRoundEnd();
  }, [checkRoundEnd, room]);

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
          <p>Stage: {room.stage}</p>

          <PlayerList />
          <p>{`Player's Turn: ${room.players[room.currentTurn].name}`}</p>
        </div>
      )}
    </>
  );
};

export default RoomInfo;
