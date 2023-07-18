'use client';

import RoomInfo from './subcomponents/roomInfo/roomInfo';
import PlayerInfo from './subcomponents/playerInfo/playerInfo';
import Spinner from '@/components/ui/spinner/spinner';
import styles from './room.module.css';
import { Player } from '@/data/types';
import { useRoom } from '@/components/providers';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useHand } from '@/components/hooks/gameActions';
import { calculatePotentialWins } from '@/utils/calculatePotentialWins';

interface RoomProps {
  sessionId?: string;
}

const Room = ({ sessionId }: RoomProps) => {
  const { slug } = useParams();
  const { room, listenRoom } = useRoom();
  const { updateHand } = useHand();

  const [player, setPlayer] = useState<Player | undefined>(undefined);

  // Use effect to listen to room changes
  useEffect(() => {
    const unsubscribe = listenRoom(slug);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [listenRoom, slug]);

  // Use effect to set current player info
  useEffect(() => {
    if (room) {
      const currentPlayer = room.players.find(
        (player) => player.session === sessionId
      );

      if (!currentPlayer) return;
      const potentialWins = calculatePotentialWins(room.players);
      currentPlayer.potentialWin = potentialWins[currentPlayer.id];
      setPlayer(currentPlayer);
    }
  }, [player, room, sessionId]);

  // Use effect to update hand
  useEffect(() => {
    if (!room) return;
    const handleRoundEnd = async () => {
      if (room.isStarted) {
        await updateHand(room);
      }
    };
    handleRoundEnd();
  }, [room, updateHand]);

  return (
    <main className={styles.wrapper}>
      {room && player ? (
        <>
          <RoomInfo />
          <PlayerInfo player={player} />
        </>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Room;
