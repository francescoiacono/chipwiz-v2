import Button from '@/components/ui/button/button';
import { useCall } from '@/components/hooks/playerActions';
import { useRoom } from '@/components/providers';

interface CallActionProps {
  disabled?: boolean;
}

const CallAction = ({ disabled }: CallActionProps) => {
  const { room } = useRoom();
  const { call } = useCall();

  const handleCall = async () => {
    if (room) await call(room);
  };

  return (
    <Button format='secondary' disabled={disabled} onClick={handleCall}>
      Call
    </Button>
  );
};

export default CallAction;
