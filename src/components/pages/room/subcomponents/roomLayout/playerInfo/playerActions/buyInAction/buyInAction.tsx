import Button from '@/components/ui/button/button';
import { useBuyIn } from '@/components/hooks/playerActions';
import { useRoom } from '@/components/providers';
import { Player } from '@/data/types';

interface BuyInActionProps {
  player: Player;
  disabled?: boolean;
}

const BuyInAction = ({ player, disabled }: BuyInActionProps) => {
  const { room } = useRoom();
  const { buyIn } = useBuyIn();

  const handleBuyIn = async () => {
    if (room && player) await buyIn(room, player);
  };

  return (
    <Button format='secondary' disabled={disabled} onClick={handleBuyIn}>
      Buy In
    </Button>
  );
};

export default BuyInAction;
