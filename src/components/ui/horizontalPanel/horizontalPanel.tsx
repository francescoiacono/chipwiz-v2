import styles from './horizontalPanel.module.css';

interface HorizontalPanelProps {
  title: string;
  children: React.ReactNode;
}

const HorizontalPanel = ({ title, children }: HorizontalPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.value}>{children}</div>
    </div>
  );
};

export default HorizontalPanel;
