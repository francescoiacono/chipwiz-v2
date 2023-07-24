import React from 'react';
import CornerLink from './cornerLink/cornerLink';
import CenterImage from './centerImage/centerImage';
import styles from './homeHero.module.css';

const HomeHero = () => (
  <div className={styles.hero}>
    <CornerLink href='/' position='topLeft'>
      ChipWiz
    </CornerLink>
    <CornerLink href='/room/signup' position='topRight'>
      Join Room
    </CornerLink>
    <CornerLink href='/room/signup' position='bottomLeft'>
      New Room
    </CornerLink>
    <CornerLink href='/about' position='bottomRight'>
      About
    </CornerLink>
    <CenterImage src='/assets/normalchip.svg' alt='Centered'>
      ChipWiz
    </CenterImage>
  </div>
);

export default HomeHero;
