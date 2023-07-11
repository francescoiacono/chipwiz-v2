'use client';

import Spinner from '@/components/ui/spinner/spinner';
import { useRoom } from '@/components/providers';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Player } from '@/data/types';

const Room = ({ sessionId }: { sessionId?: any }) => {
  const { slug } = useParams();
  const { room, listenRoom } = useRoom();

  const [player, setPlayer] = useState<Player | undefined>(undefined);

  useEffect(() => {
    console.log('USE EFFECT ROOM 1');
    const unsubscribe = listenRoom(slug);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [listenRoom, slug]);

  useEffect(() => {
    console.log('USE EFFECT ROOM 2');
    if (room) {
      const currentPlayer = room.players.find(
        (player) => player.session === sessionId
      );
      setPlayer(currentPlayer);
    }
  }, [room, sessionId]);

  return (
    <main>
      {room ? (
        <div>
          <h1>{room.name}</h1>
          <h2>Players in the room:</h2>
          <ul>
            {room.players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>

          {player ? (
            <div>
              <h2>Player: {player.name}</h2>
              <p>Chips: {player.chips}</p>
              <p>Current bet: {player.currentBet}</p>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Room;
