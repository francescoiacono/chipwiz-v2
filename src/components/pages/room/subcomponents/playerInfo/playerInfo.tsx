import { Player } from '@/data/types';
import { isPlayerTurn } from '@/utils';
import { useRoom } from '@/components/providers';
import PlayerActions from '../playerActions/playerActions';

interface PlayerInfoProps {
  player: Player;
}

const PlayerInfo = ({ player }: PlayerInfoProps) => {
  const { room } = useRoom();
  return (
    <>
      {room && (
        <div>
          <h2>Player: {player.name}</h2>
          <p>Chips: {player.chips}</p>
          <p>Current bet: {player.currentBet}</p>

          {isPlayerTurn(player.id, room) ? (
            <PlayerActions />
          ) : (
            <PlayerActions disabled />
          )}
        </div>
      )}
    </>
  );
};

export default PlayerInfo;
