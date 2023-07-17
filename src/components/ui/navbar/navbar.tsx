import Link from 'next/link';
import styles from './navbar.module.css';
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <section>
        <h1 className={styles.logo}>Logo</h1>
      </section>

      <section>
        <ul className={styles.navbarLinks}>
          <li>
            <Link href='/'>Home</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
