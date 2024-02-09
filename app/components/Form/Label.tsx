import clsx from "clsx";
import React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
}

const Label = ({children, ...rest}: Props) => {
    return (
        <label {...rest} className={clsx(['text-main block font-bold mb-2', rest.className])}>
            {children}
        </label>
    );
};

export default Label;
