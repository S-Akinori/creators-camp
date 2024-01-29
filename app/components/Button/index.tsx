interface Props {
    children: React.ReactNode;
    color?: 'main' | 'accent'
    className?: string;
}

export const Button = ({children, color = 'main', className = ''}: Props) => {
    const colors = {
        main: 'bg-main text-main-cont',
        accent: 'bg-accent'
    }
    return (
        <button className={`py-1 px-6 rounded-full ${colors[color]} ${className}`}>
            {children}
        </button>
    );
}

export default Button;