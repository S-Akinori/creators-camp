'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '../../atoms/Button';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
}

interface Props {
    value: string;
    setValue: Dispatch<SetStateAction<string>>
}

const RichEditor = ({value, setValue}: Props) => {
    return (
        <div>
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
        </div>
    );
}

export default RichEditor