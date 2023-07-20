import Button from '@/components/ui/button/button';
import { Player } from '@/data/types';

interface WinnerTitleProps {
  winner: Player;
}

const WinnerTitle = ({ winner }: WinnerTitleProps) => {
  return (
    <>
      <h1>{winner.name} won this hand!</h1>
    </>
  );
};

export default WinnerTitle;
