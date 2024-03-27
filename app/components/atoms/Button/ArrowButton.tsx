import Link from 'next/link';
import styles from './index.module.css';

interface Props {
    children: React.ReactNode;
    className?: string;
    href?: string;
}

const ArrowButton = ({ children, href, className = '' }: Props) => (
    href ? (
        <Link href={href} className={`inline-block relative py-4 px-4 bg-main border-4 border-accent ${styles.ArrowButton} ${className}`}>
            <span className='relative'>{children}</span>
        </Link>
    ) :
    <button className={`relative py-4 px-4 bg-main border-4 border-accent ${styles.ArrowButton} ${className}`}>
        <span className='relative'>{children}</span>
    </button>
);
export default ArrowButton;