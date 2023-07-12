import { useRoom } from '@/components/providers';
import { useCall, useCheck, useRaise } from '@/hooks/playerActions';
import Button from '@/components/ui/button/button';

interface PlayerActionsProps {
  disabled?: boolean;
}

const PlayerActions = ({ disabled }: PlayerActionsProps) => {
  const { room } = useRoom();
  const { call } = useCall();
  const { check } = useCheck();
  const { raise } = useRaise();

  const handleCall = async () => {
    if (room) await call(room);
  };

  const handleCheck = async () => {
    if (room) await check(room);
  };

  const handleRaise = async () => {
    if (room) await raise(20, room);
  };

  return (
    <section>
      <Button disabled={disabled} onClick={handleCall}>
        Call
      </Button>
      <Button disabled={disabled} onClick={handleCheck}>
        Check
      </Button>
      <Button disabled={disabled} onClick={handleRaise}>
        Raise
      </Button>
      <Button disabled={disabled}>Fold</Button>
    </section>
  );
};

export default PlayerActions;
