import styles from './index.module.css';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const ArrowButton = ({ children, className = '' }: Props) => (
    <button className={`relative py-4 px-4 bg-main border-4 border-accent ${styles.ArrowButton} ${className}`}>
        <span className='relative'>{children}</span>
    </button>
);
export default ArrowButton;