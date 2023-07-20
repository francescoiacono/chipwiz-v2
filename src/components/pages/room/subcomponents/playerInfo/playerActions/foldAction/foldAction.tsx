import Button from '@/components/ui/button/button';
import { useFold } from '@/components/hooks/playerActions';
import { useRoom } from '@/components/providers';

interface FoldActionProps {
  disabled?: boolean;
}

const FoldAction = ({ disabled }: FoldActionProps) => {
  const { room } = useRoom();
  const { fold } = useFold();

  const handleFold = async () => {
    if (room) await fold(room);
  };

  return (
    <Button disabled={disabled} onClick={handleFold}>
      Fold
    </Button>
  );
};

export default FoldAction;
