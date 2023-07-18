import styles from './spinner.module.css';

interface SpinnerProps {
  small?: boolean;
}

const Spinner = ({ small }: SpinnerProps) => {
  const size = small ? styles.small : styles.large;

  return <div className={`${styles.spinner} ${size}`}></div>;
};

export default Spinner;
