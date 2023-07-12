import { useRaise } from '@/components/hooks/playerActions';
import { useRoom } from '@/components/providers';
import Button from '@/components/ui/button/button';
import Slider from '@/components/ui/slider/slider';
import styles from './raiseAction.module.css';
import { useState } from 'react';

interface RaiseActionProps {
  disabled?: boolean;
}

const RaiseAction = ({ disabled }: RaiseActionProps) => {
  const { room } = useRoom();
  const { raise } = useRaise();

  const [raiseAmount, setRaiseAmount] = useState<number>(room?.smallBlind || 1);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  const handleRaise = async (amount: number) => {
    if (room) {
      await raise(amount, room);
      setShowSlider(false);
    }
  };

  const handleSliderChange = (value: number) => {
    setRaiseAmount(value);
  };

  if (!room) return null;

  const { players, currentTurn, smallBlind } = room;
  const currentPlayer = players[currentTurn];

  return (
    <section className={styles.raiseAction}>
      <Button
        disabled={disabled}
        onClick={
          showSlider
            ? () => handleRaise(raiseAmount)
            : () => setShowSlider(true)
        }
      >
        Raise
      </Button>
      {showSlider && (
        <>
          <Slider
            onChange={handleSliderChange}
            max={currentPlayer.chips}
            min={smallBlind}
            value={raiseAmount}
          />
          <p>{raiseAmount}</p>
        </>
      )}
    </section>
  );
};

export default RaiseAction;
