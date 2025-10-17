import React from "react";
import styles from "./Input.module.scss";

type InputProps = {
  type: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  disabled?: boolean;
};

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  name,
  required = false,
  disabled
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      disabled={disabled}
    />
  );
}