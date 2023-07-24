import Links from './subcomponents/links/links';
import AboutText from './subcomponents/aboutText/aboutText';
import GoBackArrow from '@/components/ui/goBackArrow/goBackArrow';

import styles from './about.module.css';

const About = () => {
  return (
    <main className={styles.wrapper}>
      <GoBackArrow />
      <AboutText />
      <Links />
    </main>
  );
};

export default About;
