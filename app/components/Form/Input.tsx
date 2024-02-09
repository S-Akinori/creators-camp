import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...rest }: Props) => {
  return (
    <input {...rest} className={`border-main border-2 rounded p-4 bg-gray-200 ${className}`} />
  );
};

export default Input;