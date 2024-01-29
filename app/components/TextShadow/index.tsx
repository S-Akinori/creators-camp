'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface Props {
    children: string;
    color?: 'main' | 'accent' | 'main-cont'
    className?: string;
    align?: 'center' | 'left' | 'right'
}

const TextShadow = ({children, className = '', color = 'main-cont', align = 'center'}: Props) => {
    const [bbox, setBbox] = useState({ width: 150, height: 50 });
    const textRef = useRef<SVGTextElement>(null);

    const colors = {
        'main-cont': 'fill-main-cont',
        main: 'fill-main',
        accent: 'fill-accent'
    }

    const aligns = {
        center: 'mx-auto',
        left: 'mr-auto ml-0',
        right: 'ml-auto mr-0'
    }
  
    useEffect(() => {
      if (textRef.current) {
        setBbox(textRef.current.getBBox());
      }
    }, [children]); // 依存配列にchildrenを指定して、テキストが変わるたびにサイズを更新

    return (
    //     <svg className={`${className}`} width={bbox.width * 1.2} height={bbox.height * 1.5}>
    //         <defs>
    //         <text className={`${styles.text} ${className}`} dy="0.4em" id="outTextx" ref={textRef}>{children}</text>
    //         </defs>
    //         <use className={styles.use} x="50%" y="50%" xlinkHref="#outTextx"></use>
    //         <use className={styles.use} x="50%" y="50%" xlinkHref="#outTextx"></use>
    //   </svg>
        <svg className={aligns[align]} width={bbox.width * 1.1} height={bbox.height * 1.1}>
            <text className={`${styles.text} ${className} ${colors[color]}`} x="50%" y="50%" dy="0.4em" ref={textRef}>{children}</text>
            <text className={`${styles.text} ${className} ${colors[color]}`} x="50%" y="50%" dy="0.4em">{children}</text>
        </svg>
    );
}

export default TextShadow;