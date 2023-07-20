import Button from '@/components/ui/button/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './roomCode.module.css';

const RoomCode = () => {
  const { slug } = useParams();
  const [buttonText, setButtonText] = useState('Copy');

  if (!slug) return null;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(slug);
    setTimeout(() => {
      setButtonText('Copied!');
    }, 200);
    setTimeout(() => {
      setButtonText('Copy');
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      <h3>
        <span>Room Code: {slug}</span>
      </h3>
      <Button format='primary' onClick={handleCopyClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default RoomCode;
