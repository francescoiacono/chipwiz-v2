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
      <label htmlFor='username'>{children}</label>
      <input
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
