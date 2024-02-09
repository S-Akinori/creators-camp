'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface Props {
    children: string | string[];
    color?: 'main' | 'accent' | 'main-cont';
    className?: string;
    align?: 'center' | 'left' | 'right';
}

const TextShadow: React.FC<Props> = ({ children, className = '', color = 'main-cont', align = 'center' }) => {
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

    // 文字列を配列に変換するヘルパー関数
    const lines = Array.isArray(children) ? children : [children];

    return (
        <svg className={aligns[align]} width={bbox.width * 1.1} height={bbox.height * 1.1}>
            <text className={`${styles.text} ${className} ${colors[color]}`} x="50%" y="50%" dy="0.4em" ref={textRef}>{children}</text>
            <text className={`${styles.text} ${className} ${colors[color]}`} x="50%" y="50%" dy="0.4em">{children}</text>
        </svg>
        // <svg
        //     className={`${aligns[align]} ${styles.svg}`}
        //     width={bbox.width * 1.1} 
        //     height={bbox.height * 1.1}
        // >
        //     <text
        //         className={`${styles.text} ${className} ${colors[color]}`}
        //         ref={textRef}
        //         x="50%"
        //         y="25" // 最初の行のY軸の位置、適宜調整してください
        //         dy="1em"
        //     >
        //         {lines.map((line, index) => (
        //             <tspan key={index} x="50%" dy={`${index}em`}>
        //                 {line}
        //             </tspan>
        //         ))}
        //     </text>
        // </svg>
    );
}

export default TextShadow;
