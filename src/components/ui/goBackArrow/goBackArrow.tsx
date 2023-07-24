'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './goBackArrow.module.css';
import { useCallback, useEffect, useState } from 'react';

type GoBackArrowProps = {
  black?: boolean;
};

const GoBackArrow = ({ black }: GoBackArrowProps) => {
  const router = useRouter();

  const [path, setPath] = useState<string>('/assets/icons/arrow_back.svg');

  const goBack = () => {
    router.back();
  };

  const handleColor = useCallback(() => {
    if (window.innerWidth <= 700 && black) {
      setPath('/assets/icons/arrow_back_black.svg');
    } else {
      setPath('/assets/icons/arrow_back.svg');
    }
  }, [black]);

  useEffect(() => {
    handleColor();
    window.addEventListener('resize', handleColor);
    return () => {
      window.removeEventListener('resize', handleColor);
    };
  }, [handleColor]);

  return (
    <button className={styles.goBackArrow} onClick={goBack}>
      <Image src={path} height={30} width={30} alt='go back' />
    </button>
  );
};

export default GoBackArrow;
