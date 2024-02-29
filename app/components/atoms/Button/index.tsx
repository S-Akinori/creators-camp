interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: 'main' | 'accent' | 'main-cont' | 'accent-cont'
    className?: string;
}

export const Button = ({children, color = 'main', className = '', ...rest}: Props) => {
    const colors = {
        'main': 'bg-main text-main-cont',
        'accent': 'bg-accent text-accent-cont',
        'main-cont': 'text-main bg-main-cont border-2 border-main transition duration-300 hover:bg-main hover:text-main-cont hover:border-main',
        'accent-cont': 'text-accent bg-accent-cont border-2 border-accent transition duration-300 hover:bg-accent hover:text-accent-cont hover:border-accent'
    }
    return (
        <button {...rest} className={`py-1 px-6 rounded-full ${colors[color]} ${className}`}>
            {children}
        </button>
    );
}

export default Button;