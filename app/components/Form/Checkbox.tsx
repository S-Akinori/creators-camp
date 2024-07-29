import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox = ({ className, ...rest }: Props) => {
  return (
    <input {...rest} type="checkbox" className={`border-main border-2 rounded p-4 bg-white ${className}`} />
  );
};

export default Checkbox;