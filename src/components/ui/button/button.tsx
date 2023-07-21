import Spinner from '../spinner/spinner';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  format: 'primary' | 'secondary' | 'tertiary';
}

const Button = ({
  children,
  loading,
  disabled,
  format,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={`${styles.button} ${className} ${styles[format]}`}
      disabled={loading || disabled}
      {...props}
    >
      <span className={`${loading ? styles.hiddenText : ''}`}>{children}</span>
      {loading && <Spinner small />}
    </button>
  );
};

export default Button;
