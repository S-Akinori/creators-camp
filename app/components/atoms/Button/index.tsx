import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: 'main' | 'accent' | 'main-cont' | 'accent-cont'
    href?: string;
    scroll?: boolean;
    className?: string;
}

export const Button = ({ children, color = 'main', className = '', href, scroll = true, ...rest }: Props) => {
    const colors = {
        'main': 'bg-main text-main-cont border-2 border-main',
        'accent': 'bg-accent text-accent-cont',
        'main-cont': 'text-main bg-main-cont border-2 border-main transition duration-300 hover:bg-main hover:text-main-cont hover:border-main',
        'accent-cont': 'text-accent bg-accent-cont border-2 border-accent transition duration-300 hover:bg-accent hover:text-accent-cont hover:border-accent'
    };

    const buttonClass = `py-1 px-6 rounded-full ${colors[color]} ${className}`;

    if (href) {
        return (
            <Link href={href} {...rest as React.AnchorHTMLAttributes<HTMLAnchorElement>} scroll={scroll} className={clsx(['inline-block', buttonClass])}>{children}</Link>
        );
    }

    return (
        <button {...rest as React.ButtonHTMLAttributes<HTMLButtonElement>} className={buttonClass}>
            {children}
        </button>
    );
}

export default Button;
