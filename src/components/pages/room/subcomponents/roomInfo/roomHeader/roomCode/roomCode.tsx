import Button from '@/components/ui/button/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './roomCode.module.css';
import Image from 'next/image';
import HorizontalPanel from '@/components/ui/horizontalPanel/horizontalPanel';

const RoomCode = () => {
  const { slug } = useParams();
  const [icon, setIcon] = useState<string>('/assets/icons/content_copy.svg');

  if (!slug) return null;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(slug);
    setTimeout(() => {
      setIcon('/assets/icons/done.svg');
    }, 200);
    setTimeout(() => {
      setIcon('/assets/icons/content_copy.svg');
    }, 2000);
  };

  return (
    <HorizontalPanel title='Room Code'>
      <p>{slug}</p>
      <button className={styles.button} onClick={handleCopyClick}>
        <Image src={icon} alt='Copy' width={15} height={15} />
      </button>
    </HorizontalPanel>
  );
};

export default RoomCode;
