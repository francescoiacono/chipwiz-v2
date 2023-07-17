import Input from '../input/input';

interface FormInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name: string;
  placeholder?: string;
  value: string | number;
  children: React.ReactNode;
}

const FormInput = ({
  handleChange,
  value,
  type,
  name,
  placeholder,
  children,
}: FormInputProps) => {
  return (
    <div>
      <label>{children}</label>
      <Input
        onChange={handleChange}
        type={type || 'text'}
        name={name}
        placeholder={placeholder || '...'}
        value={value}
      />
    </div>
  );
};

export default FormInput;
