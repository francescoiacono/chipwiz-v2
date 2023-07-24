import Link from 'next/link';
import Image from 'next/image';
import GoBackArrow from '@/components/ui/goBackArrow/goBackArrow';

import styles from './about.module.css';

const About = () => {
  return (
    <main className={styles.wrapper}>
      <GoBackArrow />
      <section className={styles.aboutWrapper}>
        <h1>About ChipWiz</h1>
        <p>
          ChipWiz is a web application, designed to streamline the process of
          keeping track of poker chips during your games, so that you can easily
          enjoy a game of poker with your friends and eliminating the need for
          physical chips.
        </p>

        <p>
          ChipWiz is part of{' '}
          <Link href='https://francescoiacono.co.uk'>my portfolio</Link> as
          personal project. The primary motivation was my desire to play poker
          with friends in the absence of physical poker chips. At the same time,
          it provided me an opportunity to enhance my web development skills.
        </p>
        <p>
          As a work in progress, ChipWiz continues to evolve and welcomes
          constructive feedback. If you have any suggestions or feedback to
          offer, please do not hesitate to reach out via email.
        </p>
      </section>
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
    </main>
  );
};

export default About;
