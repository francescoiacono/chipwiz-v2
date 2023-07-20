'use client';
import Image from 'next/image';
import styles from './goBackArrow.module.css';
import { useRouter } from 'next/navigation';

const GoBackArrow: React.FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button className={styles.goBackArrow} onClick={goBack}>
      <Image
        src='/assets/icons/arrow_back.svg'
        height={30}
        width={30}
        alt='go back'
      />
    </button>
  );
};

export default GoBackArrow;
