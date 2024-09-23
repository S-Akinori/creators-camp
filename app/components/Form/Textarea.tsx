import React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  children?: React.ReactNode;
}

const Textarea = ({children, className, ...rest }: Props) => {
  return (
    <textarea {...rest} className={`border-main border-2 rounded p-4 ${className}`}>{children}</textarea>
  );
};

export default Textarea;