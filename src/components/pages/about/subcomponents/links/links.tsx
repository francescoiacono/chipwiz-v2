import Link from 'next/link';
import Image from 'next/image';

import styles from './links.module.css';

const Links = () => {
  return (
    <section>
      <ul className={styles.links}>
        <li>
          <Link href='https://github.com/francescoiacono/chipwiz-v2'>
            <Image
              alt='github'
              src='/assets/icons/github.svg'
              height={40}
              width={40}
            />
          </Link>
        </li>
        <li>
          <Link href='mailto:contact@francescoiacono.co.uk'>
            <Image
              alt='github'
              src='/assets/icons/email.svg'
              height={40}
              width={40}
            />
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Links;
