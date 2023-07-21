import Input from '../input/input';
import styles from './formInput.module.css';

interface FormInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name: string;
  placeholder?: string;
  value: string | number;
  children?: React.ReactNode;
}

const FormInput = ({
  handleChange,
  value,
  type,
  name,
  placeholder,
  children,
}: FormInputProps) => {
  const handleChangeCorrectly = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (type === 'number') e.target.value = e.target.value.substring(1);
  };

  return (
    <div className={styles.formInput}>
      {children && <label>{children}</label>}
      <Input
        onChange={handleChangeCorrectly}
        type={type || 'text'}
        name={name}
        placeholder={placeholder || '...'}
        value={value}
      />
    </div>
  );
};

export default FormInput;
