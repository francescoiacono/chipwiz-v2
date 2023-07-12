import Button from '@/components/ui/button/button';
import PlayerList from '../playerList/playerList';
import React from 'react';
import { useRoom } from '@/components/providers';
import { useRound } from '@/hooks/playerActions/useRound';
import { useEffect, useState, useCallback } from 'react';
import { Player, Stage } from '@/data/types';
import { startHand } from '@/services';

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

  useEffect(() => {
    if (!room) return;

    const handleRoundEnd = async () => {
      if (room.isStarted && room.stage !== Stage.SHOWDOWN) {
        await checkRoundEnd(room);
      }
    };

    const setRoomWinner = () => {
      const winner = room.players.find((player) => player.isWinner);
      if (winner) {
        setWinner(winner);
      } else {
        setWinner(null);
      }
    };

    handleRoundEnd();
    setRoomWinner();
  }, [room, checkRoundEnd, winner]);

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
          Game Status:{' '}
          {isStarted ? <span>(Game Started)</span> : <span>(Waiting...)</span>}
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
      {winner ? (
        <div>
          <p>Winner: {winner.name}</p>
          <Button onClick={handleHandReset}>Next Hand</Button>
        </div>
      ) : (
        <p>Select winner </p>
      )}
    </div>
  );
};

export default React.memo(RoomInfo);
