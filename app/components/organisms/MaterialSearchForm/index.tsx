'use client'
import React, { useState, FormEvent, useEffect } from 'react';
import Input from '../../Form/Input';
import Select from '../../Form/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../../atoms/Button';
import FormControl from '../../Form/FormControl';


const MaterialSearchForm: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();

    const [keyword, setKeyword] = useState('');
    const [query, setQuery] = useState<{ [key: string]: string }>({});


    useEffect(() => {
        const params: { [key: string]: string } = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        setQuery(params);
    }, [searchParams]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateQueryParams('keyword', keyword);
    };

    const updateQueryParams = (key: string, value: string) => {
        const newQuery = { ...query, [key]: value };
        const queryString = new URLSearchParams(newQuery).toString();
        router.push(`${pathname}?${queryString}`);
    };


    return (
        <form onSubmit={handleSubmit} className="p-4">
            <FormControl>
                <Input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="キーワードを入力"
                    className='mr-4 w-full'
                />
                <Button type='submit' className='shrink-0'>検索</Button>
            </FormControl>
        </form>
    );
};

export default MaterialSearchForm;
