interface Props {
    children: React.ReactNode;
    color?: 'main' | 'accent' | 'main-cont' | 'accent-cont'
    className?: string;
}

export const Button = ({children, color = 'main', className = ''}: Props) => {
    const colors = {
        main: 'bg-main text-main-cont',
        accent: 'bg-accent',
        'main-cont': 'text-main bg-main-cont border-2 border-main transition duration-300 hover:bg-main hover:text-main-cont hover:border-main',
        'accent-cont': 'text-accent bg-accent-cont border-2 border-accent'
    }
    return (
        <button className={`py-1 px-6 rounded-full ${colors[color]} ${className}`}>
            {children}
        </button>
    );
}

export default Button;