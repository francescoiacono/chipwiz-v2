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
      {room.winner && <WinnerTitle winner={room.winner} />}
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
