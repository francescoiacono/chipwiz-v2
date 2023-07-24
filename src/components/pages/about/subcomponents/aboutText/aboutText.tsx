import Link from 'next/link';
import styles from './aboutText.module.css';

const AboutText = () => {
  return (
    <section className={styles.wrapper}>
      <h1>About ChipWiz</h1>

      <p>
        Has it ever happened to you that you wanted to play a game of poker with
        your friends, but you did not have any poker chips available? Or maybe
        you had some chips, but not enough for each player?
      </p>

      <p>
        ChipWiz is a web application, designed to streamline the process of
        keeping track of poker chips during your games, so that you can easily
        concentrate on your poker skills and eliminating the need for physical
        chips.
      </p>

      <p>
        This gave me the idea to create ChipWiz as a personal project which is
        part of <Link href='https://francescoiacono.co.uk'>my portfolio</Link>.
        The primary motivation was my desire to play poker with friends in the
        absence of physical poker chips and at the same time, it provided me an
        opportunity to enhance my web development skills.
      </p>

      <p>
        As a work in progress, ChipWiz continues to evolve and welcomes
        constructive feedback. If you have any suggestions or feedback to offer,
        please do not hesitate to reach out.
      </p>
    </section>
  );
};

export default AboutText;
