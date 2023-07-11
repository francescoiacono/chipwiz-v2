'use client';
import { useRoom } from '@/components/providers';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Spinner from '@/components/ui/spinner/spinner';

const Room = ({ sessionId }: { sessionId: any }) => {
  const { slug } = useParams();
  const { room, listenRoom } = useRoom();

  useEffect(() => {
    console.log('USE EFFECT ROOM');
    const unsubscribe = listenRoom(slug);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [listenRoom, slug]);

  return (
    <main>
      {room ? (
        <div>
          <h1>{room.name}</h1>
          <h2>Players: {sessionId}</h2>
          <ul>
            {room.players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Room;
