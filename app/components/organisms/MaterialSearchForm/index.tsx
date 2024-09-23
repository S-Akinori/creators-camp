'use client'
import React, { useState, FormEvent, useEffect } from 'react';
import Input from '../../Form/Input';
import Select from '../../Form/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../../atoms/Button';
import FormControl from '../../Form/FormControl';
import { http } from '@/app/lib/http';
import { Tag } from '@/app/types/Tag';
import Link from 'next/link';
import { updateQueryString } from '@/app/lib/functions/updateQueryString';


const MaterialSearchForm: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();

    const [keyword, setKeyword] = useState('');
    const [query, setQuery] = useState<{ [key: string]: string }>({});
    const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
    const [isTagSearch, setIsTagSearch] = useState(false);


    useEffect(() => {
        if (isTagSearch && keyword.length > 1) {
            // '#' 以外の文字がある場合に検索実行
            const fetchTags = async () => {
                try {
                    const response = await http.get('/tags', {
                        params: { search: keyword.slice(1) }, // '#'を除外して部分一致検索
                    });
                    setSuggestedTags(response.data);
                } catch (error) {
                    console.error('Error fetching tags:', error);
                }
            };

            fetchTags();
        } else {
            setSuggestedTags([]); // タグ検索が無効な場合はサジェストリストをクリア
        }
    }, [keyword]);

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

    // 入力の変更ハンドラ
    const handleInputChange:  React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        setKeyword(value);
        if (value.startsWith('#')) {
            setIsTagSearch(true);
        } else {
            setIsTagSearch(false);
        }
    };

    // タグをクリックして検索
    const handleTagClick = (tag: string) => {
        setKeyword(`#${tag}`); // タグ名を検索入力にセット
        setSuggestedTags([]); // サジェストリストをクリア
        // 実際のタグ検索を実行 (例: API呼び出しやリダイレクト)
        performSearchByTag(tag);
    };

    const performSearchByTag = (tag: string) => {
        // タグ検索を実行する関数 (APIリクエストやリダイレクトを処理)
        console.log('Searching for tag:', tag);
    };


    return (
        <form onSubmit={handleSubmit} className="p-4">
            <FormControl>
                <div className='mr-4 w-full'>
                    <Input
                        type="text"
                        value={keyword}
                        // onChange={(e) => setKeyword(e.target.value)}
                        onChange={handleInputChange}
                        placeholder="キーワードを入力"
                        className='mb-4 md:mb-0 w-full'
                    />
                    {/* タグのサジェストリスト */}
                    {isTagSearch && suggestedTags.length > 0 && (
                        <ul className="md:relative border border-gray-300 bg-white mt-0 mb-4">
                            {suggestedTags.map((tag) => (
                                <li
                                    key={tag.id}
                                    onClick={() => handleTagClick(tag.name)}
                                    className="p-2 border-b cursor-pointer hover:bg-gray-200"
                                >
                                    #{tag.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='text-center shrink-0'>
                    <Button type='submit'>検索</Button>
                </div>
            </FormControl>
        </form>
    );
};

export default MaterialSearchForm;
