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
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
