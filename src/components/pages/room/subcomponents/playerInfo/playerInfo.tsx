import { Player, Role } from '@/data/types';
import { isPlayerTurn } from '@/utils';
import { useRoom } from '@/components/providers';
import { useEffect, useState } from 'react';
import { startHand } from '@/services';
import PlayerActions from '../playerActions/playerActions';
import Button from '@/components/ui/button/button';

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
  }, [player.id, player.role, room]);

  return (
    <>
      {room && (
        <div>
          <h2>Player: {player.name}</h2>
          {playerTurn && <h3>{`It's your turn!`}</h3>}
          <p>Chips: {player.chips}</p>
          <p>Current bet: {player.currentBet}</p>
          <p>To call: {room.highestBet - player.currentBet}</p>
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
