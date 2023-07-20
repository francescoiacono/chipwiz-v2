import { useRoom } from '@/components/providers';
import Button from '@/components/ui/button/button';
import { Player } from '@/data/types';

interface WinnerSelectorProps {
  handleWinnerSelection: (player: Player) => void;
  possibleWinners: Player[];
}

const WinnerSelector = ({
  handleWinnerSelection,
  possibleWinners,
}: WinnerSelectorProps) => {
  const { room } = useRoom();

  return (
    <>
      <p>Select winner for Pot {room?.pots.length} </p>
      <ul>
        {possibleWinners.map((player, i) => {
          if (player.isFolded) {
            return null;
          } else {
            return (
              <li key={i}>
                <Button
                  format='primary'
                  onClick={() => handleWinnerSelection(player)}
                >
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
