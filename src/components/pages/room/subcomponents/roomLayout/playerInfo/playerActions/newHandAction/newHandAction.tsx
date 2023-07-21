import Button from '@/components/ui/button/button';
import { useHand } from '@/components/hooks/gameActions';
import { Player, Room, Stage } from '@/data/types';
import { getBustedPlayers, isPlayerHost } from '@/utils';
import { useEffect, useState } from 'react';

interface NewHandActionProps {
  player: Player;
  room: Room;
}

const NewHandAction = ({ player, room }: NewHandActionProps) => {
  const { startHand } = useHand();
  const { players, isStarted, winner, stage } = room;

  const [error, setError] = useState<string>('');

  const handleNewHand = async () => {
    if (getBustedPlayers(players).length === players.length - 1) {
      setTimeout(
        () => setError('Not enough players to start a new hand!'),
        1000
      );
    } else {
      setError('');
      await startHand(room);
    }
  };

  return (
    <>
      {isPlayerHost(player) &&
        !isStarted &&
        ((stage === Stage.PREFLOP && !winner) ||
          (stage === Stage.SHOWDOWN && winner)) && (
          <>
            <Button format='secondary' onClick={() => handleNewHand()}>
              New Hand
            </Button>
            {error && `Error: ${error}`}
          </>
        )}
    </>
  );
};

export default NewHandAction;
