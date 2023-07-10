import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({
  children,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={`${styles.button} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
