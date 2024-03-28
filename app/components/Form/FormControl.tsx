import clsx from "clsx";

interface Props {
    children: React.ReactNode;
    flex?: boolean;
    className?: string;
}

const FormControl = ({children, flex = true, className}: Props) => {
    return (
        <div className={clsx('mb-4', flex && 'md:flex justify-center items-center', className)}>
            {children}
        </div>
    )
}

export default FormControl;