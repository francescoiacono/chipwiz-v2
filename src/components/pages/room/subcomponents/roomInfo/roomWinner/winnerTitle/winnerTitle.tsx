import Button from '@/components/ui/button/button';
import { Player } from '@/data/types';

interface WinnerTitleProps {
  winner: Player;
  handleHandReset: () => void;
}

const WinnerTitle = ({ winner, handleHandReset }: WinnerTitleProps) => {
  return (
    <>
      <h1>Winner: {winner.name}</h1>
      <Button onClick={handleHandReset}>Next Hand</Button>
    </>
  );
};

export default WinnerTitle;
