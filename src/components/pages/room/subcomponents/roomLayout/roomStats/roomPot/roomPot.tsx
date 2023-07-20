import HorizontalPanel from '@/components/ui/horizontalPanel/horizontalPanel';
import { useRoom } from '@/components/providers';

const RoomPot = () => {
  const { room } = useRoom();

  if (!room) return null;

  const { pots, currentPot } = room;
  return (
    <HorizontalPanel title={`Pot #${currentPot + 1}`}>
      {pots[currentPot].amount}
    </HorizontalPanel>
  );
};

export default RoomPot;
