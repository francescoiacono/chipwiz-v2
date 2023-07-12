import React, { useState, useEffect, useCallback } from 'react';
import Button from '@/components/ui/button/button';
import PlayerList from '../playerList/playerList';
import { useRoom } from '@/components/providers';
import { useRound } from '@/hooks/playerActions/useRound';
import { Player, Stage } from '@/data/types';
import { startHand, updateRoom } from '@/services';

const RoomInfo = () => {
  const { room } = useRoom();
  const { checkRoundEnd } = useRound();
  const [winner, setWinner] = useState<Player | null>(null);

  const handleHandReset = useCallback(async () => {
    if (room) {
      await startHand(room);
      setWinner(null);
    }
  }, [room]);

  const handleWinnerSelection = useCallback(
    async (player: Player) => {
      if (room) {
        await updateRoom(room.id, {
          ...room,
          winner: player,
        });
      }
    },
    [room]
  );

  useEffect(() => {
    if (!room) return;

    const handleRoundEndAndSetWinner = async () => {
      if (room.isStarted && room.stage !== Stage.SHOWDOWN) {
        await checkRoundEnd(room);
      }

      const { winner } = room;
      if (winner) setWinner(winner || null);
    };

    handleRoundEndAndSetWinner();
  }, [room, checkRoundEnd]);

  if (!room) return null;

  const {
    name,
    isStarted,
    pot,
    smallBlind,
    bigBlind,
    stage,
    players,
    currentTurn,
  } = room;

  return (
    <div>
      <div>
        <h1>{name}</h1>
        <p>
          Game Status: {isStarted && <span>(Game Started)</span>}{' '}
          {!isStarted && <span>(Waiting...)</span>}
        </p>
      </div>
      <p>Room Pot: {pot}</p>
      <p>
        Blinds: {smallBlind} / {bigBlind}
      </p>
      <p>Stage: {stage}</p>
      <PlayerList />
      <p>
        Player{`'`}s Turn: {players[currentTurn].name}
      </p>
      {winner && (
        <div>
          <p>Winner: {winner.name}</p>
          <Button onClick={handleHandReset}>Next Hand</Button>
        </div>
      )}

      {!winner && stage === Stage.SHOWDOWN && (
        <>
          <p>Select winner </p>
          <ul>
            {players.map((player) => {
              if (player.isFolded) {
                return null;
              } else {
                return (
                  <li key={player.id}>
                    <Button onClick={() => handleWinnerSelection(player)}>
                      {player.name}
                    </Button>
                  </li>
                );
              }
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default React.memo(RoomInfo);
