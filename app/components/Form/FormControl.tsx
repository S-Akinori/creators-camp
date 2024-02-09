import clsx from "clsx";

interface Props {
    children: React.ReactNode;
    flex?: boolean;
}

const FormControl = ({children, flex = true}: Props) => {
    return (
        <div className={clsx('mb-4', flex && 'md:flex justify-center items-center')}>
            {children}
        </div>
    )
}

export default FormControl;