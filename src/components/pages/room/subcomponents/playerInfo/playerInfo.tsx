import { Player, Role } from '@/data/types';
import { isPlayerTurn } from '@/utils';
import { useRoom } from '@/components/providers';
import { useEffect, useState } from 'react';
import PlayerActions from '../playerActions/playerActions';
import Button from '@/components/ui/button/button';
import { useHand } from '@/components/hooks/gameActions';

interface PlayerInfoProps {
  player: Player;
}

const PlayerInfo = ({ player }: PlayerInfoProps) => {
  const { room } = useRoom();
  const { startHand } = useHand();

  const [playerTurn, setPlayerTurn] = useState(false);
  const [isPlayerHost, setIsPlayerHost] = useState(false);

  useEffect(() => {
    if (room) {
      setPlayerTurn(isPlayerTurn(player.id, room));
      setIsPlayerHost(player.role === Role.HOST);
    }
  }, [player.roundBet, player.id, player.role, room]);

  return (
    <>
      {room && (
        <div>
          <h2>Player: {player.name}</h2>
          <p>Chips: {player.chips}</p>
          <p>Current bet: {player.roundBet}</p>
          <p>
            To call:
            {room.highestBet > player.chips
              ? player.chips
              : room.highestBet - player.roundBet}
          </p>
          {room.isStarted && (
            <>{playerTurn ? <PlayerActions /> : <PlayerActions disabled />}</>
          )}
          {isPlayerHost && !room.isStarted && (
            <Button onClick={() => startHand(room)}>Start Game</Button>
          )}
        </div>
      )}
    </>
  );
};

export default PlayerInfo;
