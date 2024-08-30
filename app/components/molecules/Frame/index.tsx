import React from 'react';

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Frame: React.FC<FrameProps> = ({ children, ...props }) => {
    return (
        <div {...props} className={`bg-accent border-2 border-main p-1 ${props.className}`}>
            <div className='bg-main h-full p-4'>
                {children}
            </div>
        </div>
    );
}

export default Frame;