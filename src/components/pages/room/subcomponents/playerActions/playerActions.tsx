import Button from '@/components/ui/button/button';

interface PlayerActionsProps {
  disabled?: boolean;
}

const PlayerActions = ({ disabled }: PlayerActionsProps) => {
  return (
    <section>
      <Button disabled={disabled}>Call</Button>
      <Button disabled={disabled}>Check</Button>
      <Button disabled={disabled}>Raise</Button>
      <Button disabled={disabled}>Fold</Button>
    </section>
  );
};

export default PlayerActions;
