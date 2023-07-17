import Button from '@/components/ui/button/button';
import { useRoom } from '@/components/providers';
import { Player, Stage } from '@/data/types';
import { useHand } from '@/components/hooks/gameActions';
import { useCallback, useEffect } from 'react';
import WinnerTitle from './winnerTitle/winnerTitle';
import WinnerSelector from './winnerSelector/winnerSelector';

const RoomWinner = () => {
  const { room } = useRoom();
  const { startHand, setHandWinner } = useHand();

  // Handle reset when new round button is pressed
  const handleHandReset = useCallback(async () => {
    if (room) {
      await startHand(room);
    }
  }, [room]);

  // Handle winner selection
  const handleWinnerSelection = async (player: Player) => {
    if (room) {
      await setHandWinner(room, player);
    }
  };

  if (!room) return null;
  const { stage, pots, currentPot } = room;

  // Component
  return (
    <>
      {room.winner && (
        <WinnerTitle handleHandReset={handleHandReset} winner={room.winner} />
      )}
      {!room.winner && stage === Stage.SHOWDOWN && (
        <WinnerSelector
          handleWinnerSelection={handleWinnerSelection}
          possibleWinners={pots[currentPot].possibleWinners}
        />
      )}
    </>
  );
};

export default RoomWinner;
