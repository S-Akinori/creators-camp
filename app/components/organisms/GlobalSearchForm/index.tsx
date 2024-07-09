'use client'
import React, { useState, FormEvent, useEffect } from 'react';
import Input from '../../Form/Input';
import Select from '../../Form/Select';
import { useRouter } from 'next/navigation';
import Button from '../../atoms/Button';
import FormControl from '../../Form/FormControl';

const GlobalSearchForm: React.FC = () => {
    const router = useRouter();

    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState('materials');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/${type}?keyword=${keyword}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl style={{marginBottom: 0}}>
                <Input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="キーワードを入力"
                    className='mr-4 w-full'
                    style={{padding: '.5rem'}}
                />
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className='mr-4'
                    style={{padding: '.5rem'}}
                >
                    <option value='materials'>素材</option>
                    <option value='users'>ユーザー</option>
                </Select>
                <Button type='submit' className='shrink-0'>検索</Button>
            </FormControl>
        </form>
    );
};

export default GlobalSearchForm;
