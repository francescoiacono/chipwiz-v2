import Link from 'next/link';
import styles from './cornerLink.module.css';

type CornerLinkProps = {
  href: string;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  children: React.ReactNode;
};

const CornerLink: React.FC<CornerLinkProps> = ({
  href,
  position,
  children,
}) => (
  <Link href={href} className={`${styles.linkWrapper} ${styles[position]}`}>
    {children}
  </Link>
);

export default CornerLink;
