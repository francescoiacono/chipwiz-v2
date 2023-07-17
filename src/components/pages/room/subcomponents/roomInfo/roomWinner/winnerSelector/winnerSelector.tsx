import { useRoom } from '@/components/providers';
import Button from '@/components/ui/button/button';
import { Player } from '@/data/types';
import { useEffect, useState } from 'react';

interface WinnerSelectorProps {
  handleWinnerSelection: (player: Player) => void;
  possibleWinners: Player[];
}

const WinnerSelector = ({
  handleWinnerSelection,
  possibleWinners,
}: WinnerSelectorProps) => {
  const { room } = useRoom();
  const [options, setOptions] = useState(possibleWinners);

  useEffect(() => {
    if (room) {
      const updatedOptions = room.players.filter((player) => !player.isFolded);
      setOptions(updatedOptions);
    }
  }, [room]);

  return (
    <>
      <p>Select winner </p>
      <ul>
        {options.map((player, i) => {
          if (player.isFolded) {
            return null;
          } else {
            return (
              <li key={i}>
                <Button onClick={() => handleWinnerSelection(player)}>
                  {player.name}
                </Button>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default WinnerSelector;
