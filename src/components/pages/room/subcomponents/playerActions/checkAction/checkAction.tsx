import Button from '@/components/ui/button/button';
import { useCheck } from '@/components/hooks/playerActions';
import { useRoom } from '@/components/providers';

interface CheckActionProps {
  disabled?: boolean;
}

const CheckAction = ({ disabled }: CheckActionProps) => {
  const { room } = useRoom();
  const { check } = useCheck();

  const handleCheck = async () => {
    if (room) await check(room);
  };

  return (
    <Button disabled={disabled} onClick={handleCheck}>
      Check
    </Button>
  );
};

export default CheckAction;
