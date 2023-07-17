import Button from '@/components/ui/button/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';

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
    <div>
      <h1>Room Code: {slug}</h1>
      <Button onClick={handleCopyClick}>{buttonText}</Button>
    </div>
  );
};

export default RoomCode;
