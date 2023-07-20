import React from 'react';
import styles from './centerImage.module.css';
import Image from 'next/image';

type CenterImageProps = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

const CenterImage: React.FC<CenterImageProps> = ({ src, alt, children }) => (
  <div className={styles.center}>
    <Image
      src={src}
      alt={alt}
      className={styles.image}
      width={300}
      height={300}
    />
    <div className={styles.innerText}>{children}</div>
    <div className={styles.description}>
      When you need poker chips but don{`'`}t have any
    </div>
  </div>
);

export default CenterImage;
