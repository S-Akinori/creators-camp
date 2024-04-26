interface Props {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children , className = ''}: Props) => {
    return (
        <div className={`relative container mx-auto px-4 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

export default Container;