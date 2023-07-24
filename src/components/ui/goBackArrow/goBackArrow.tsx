'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './goBackArrow.module.css';

type GoBackArrowProps = {
  black?: boolean;
};

const GoBackArrow = ({ black }: GoBackArrowProps) => {
  const router = useRouter();

  const [path, setPath] = useState<string>('/assets/icons/arrow_back.svg');

  const goBack = () => {
    router.push('/');
  };

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth <= 700 && black) {
      setPath('/assets/icons/arrow_back_black.svg');
    } else {
      setPath('/assets/icons/arrow_back.svg');
    }
  }, [black]);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <button className={styles.goBackArrow} onClick={goBack}>
      <Image src={path} height={30} width={30} alt='go back' />
    </button>
  );
};

export default GoBackArrow;
