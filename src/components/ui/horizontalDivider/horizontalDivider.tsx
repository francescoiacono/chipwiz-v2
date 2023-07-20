import styles from './horizontalDivider.module.css';

const HorizontalDivider = () => {
  return (
    <div className={styles.horizontalDivider}>
      <div></div>
      <p>or</p>
      <div></div>
    </div>
  );
};

export default HorizontalDivider;
