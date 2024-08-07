interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode;
}

const Select = ({ children, ...props }: Props) => {
    return (
        <select {...props} className={`border-main border-2 rounded p-4 bg-white ${props.className}`}>
            {children}
        </select>
    );
}

export default Select;