'use client';

import Spinner from '@/components/ui/spinner/spinner';
import { useRoom } from '@/components/providers';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Player } from '@/data/types';
import PlayerActions from './subcomponents/playerActions/playerActions';
import { isPlayerTurn } from '@/utils';
import RoomInfo from './subcomponents/roomInfo/roomInfo';
import PlayerInfo from './subcomponents/playerInfo/playerInfo';

interface RoomProps {
  sessionId?: string;
}

const Room = ({ sessionId }: RoomProps) => {
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
      {room && player ? (
        <div>
          <RoomInfo />
          <PlayerInfo player={player} />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Room;
