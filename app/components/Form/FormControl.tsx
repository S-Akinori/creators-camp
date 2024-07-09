import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode;
    flex?: boolean;
    className?: string;
}

const FormControl = ({children, flex = true, className, ...rest}: Props) => {
    return (
        <div {...rest} className={clsx('mb-4', flex && 'md:flex justify-center items-center', className)}>
            {children}
        </div>
    )
}

export default FormControl;