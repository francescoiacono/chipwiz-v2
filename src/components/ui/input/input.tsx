import React, { InputHTMLAttributes } from 'react';

import styles from './input.module.css';

const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={`${styles.input} ${props.className}`} {...props} />;
};

export default Input;
