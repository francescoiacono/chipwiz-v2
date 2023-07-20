import styles from './verticalPanel.module.css';

interface VerticalPanelProps {
  title: string;
  children: React.ReactNode;
}

const VerticalPanel = ({ title, children }: VerticalPanelProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.value}>{children}</div>
    </div>
  );
};

export default VerticalPanel;
