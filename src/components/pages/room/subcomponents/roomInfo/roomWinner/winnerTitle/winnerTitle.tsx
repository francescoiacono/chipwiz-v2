import Button from '@/components/ui/button/button';
import { Player } from '@/data/types';

interface WinnerTitleProps {
  winner: Player;
}

const WinnerTitle = ({ winner }: WinnerTitleProps) => {
  return (
    <>
      <h1>Winner: {winner.name}</h1>
    </>
  );
};

export default WinnerTitle;
