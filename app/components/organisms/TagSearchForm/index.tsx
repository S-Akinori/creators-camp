'use client'
import React, { useState, FormEvent, useEffect } from 'react';
import Input from '../../Form/Input';
import Select from '../../Form/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../../atoms/Button';
import FormControl from '../../Form/FormControl';
import { Tag } from '@/app/types/Tag';
import { getTags } from '@/app/lib/tag';
import { Autocomplete, TextField } from '@mui/material';

const TagSearchForm: React.FC = () => {
    const router = useRouter();
    const [tags, setTags] = useState<Tag[]>([]);
    const [tagId, setTagId] = useState<string|number|null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            const data = await getTags();
            setTags(data);
        }
        fetchTags();
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!tagId) return;
        router.push(`/search/materials?tag_id=${tagId}`);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string|null) => {
        const tag = tags.find(tag => tag.name === newValue);
        if (tag) {
            setTagId(tag.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <FormControl>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={tags.map((tag) => tag.name)}
                    fullWidth
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} placeholder='タグを入力' />}
                    className='mr-4 bg-white border-main border-2 rounded'
                />
                <Button type='submit' className='shrink-0'>検索</Button>
            </FormControl>
        </form>
    );
};

export default TagSearchForm;
