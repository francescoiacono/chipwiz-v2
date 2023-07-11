import { Player, Role } from '@/data/types';
import { isPlayerTurn } from '@/utils';
import { useRoom } from '@/components/providers';
import PlayerActions from '../playerActions/playerActions';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/button';
import { startHand } from '@/services';

interface PlayerInfoProps {
  player: Player;
}

const PlayerInfo = ({ player }: PlayerInfoProps) => {
  const { room } = useRoom();

  const [playerTurn, setPlayerTurn] = useState(false);
  const [isPlayerHost, setIsPlayerHost] = useState(false);

  useEffect(() => {
    if (room) {
      setPlayerTurn(isPlayerTurn(player.id, room));
      setIsPlayerHost(player.role === Role.HOST);
    }
  }, []);

  return (
    <>
      {room && (
        <div>
          <h2>Player: {player.name}</h2>
          <p>Chips: {player.chips}</p>
          <p>Current bet: {player.currentBet}</p>
          {playerTurn ? <PlayerActions /> : <PlayerActions disabled />}
          {isPlayerHost && !room.isStarted && (
            <Button onClick={() => startHand(room)}>Start Game</Button>
          )}
        </div>
      )}
    </>
  );
};

export default PlayerInfo;
