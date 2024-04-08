import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, open, setOpen }: Props) => open ? ReactDOM.createPortal(
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg">
                <button onClick={() => setOpen(!open)} className="absolute top-0 right-0 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    , document.body) : null;

export default Modal;