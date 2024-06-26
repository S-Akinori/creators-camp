'use client'
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Material, Pagination } from '@/app/types/Material';
import { User } from '@/app/types/User';
import { http } from '@/app/lib/http';
import Modal from '../../molecules/Modal';
import LoadingIcon from '../../atoms/Icons/LoadingIcons';
import Link from 'next/link';
import { toDateString } from '@/app/lib/functions/toDateString';
import Input from '../../Form/Input';
import FormControl from '../../Form/FormControl';
import { Button } from '@mui/material';
import {Button as MyButton} from '../../atoms/Button';
import { Category } from '@/app/types/Category';
import { csrf } from '@/app/lib/csrf';

interface UpdateData {
    id: number;
    status: 'active' | 'inactive' | 'deleted';
}

const textMap = {
    active: 'アクティブ',
    inactive: '凍結',
    deleted: '削除'
}

export default function AdminCategoriesTableClient() {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState<UpdateData | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');

    useEffect(() => {
        const fetchNews = async () => {
            const res = await http.get(`/categories`);
            setCategories(res.data);
        }
        fetchNews()
    }, []);

    const updateStatus = async (id: number, status: string) => {
        setStatus('submitting')
        try {
            await csrf();
            await http.delete(`/categories/${id}`);
            const res = await http.get('/categories');
            setCategories(res.data);
            setStatus('success');
            setTimeout(() => {
                setOpen(false);
                setUpdateData(null);
                setStatus('idle');
            }, 1000);
        } catch (e) {
            setStatus('error');
        }

    }

    const setModal = (id: number, status: 'active' | 'inactive' | 'deleted') => {
        setUpdateData({ id, status });
        setOpen(true);
    }

    const createCategory = async (formData: FormData) => {
        setStatus('submitting');
        try {
            await csrf();
            await http.post('/categories', formData);
            const res = await http.get('/categories');
            setCategories(res.data);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
            }, 1000);
        } catch (e) {
            console.log(e);
            setStatus('error');
        }
    }

    return (
        <>
            {updateData && (
                <Modal open={open} setOpen={setOpen}>
                    <div>
                        {(status === 'idle' || status === 'submitting') && (
                            <>
                                <p>本当に{textMap[updateData.status]}しますか？</p>
                                <Button variant="contained" color='warning' onClick={() => updateStatus(updateData.id, updateData.status)} sx={{ margin: '.25rem' }}>
                                    {status === 'submitting' ? <LoadingIcon /> : textMap[updateData.status]}
                                </Button>
                                <Button variant='outlined' onClick={() => setOpen(false)} sx={{ margin: '.25rem' }}>キャンセル</Button>
                            </>
                        )}
                        {status === 'error' && (
                            <>
                                <p>エラーが発生しました</p>
                                <Button variant='outlined' onClick={() => setOpen(false)} sx={{ margin: '.25rem' }}>閉じる</Button>
                            </>
                        )}
                        {status === 'success' && (
                            <>
                                <p>更新が完了しました</p>
                            </>
                        )}
                    </div>
                </Modal>
            )}
            <div className='p-4 bg-white max-w-md mx-auto'>
                {categories && categories.map((category) => (
                    <div key={category.id} className='flex p-4 border-b border-main items-center'>
                        <div className='w-40'>{category.name}</div>
                        <div className='text-center grow'>
                            <Button variant="outlined" sx={{ margin: '.25rem' }}><Link href={`/admin/categories/edit/${category.id}`}>修正</Link></Button>
                            <Button variant="outlined" color='warning' sx={{ margin: '.25rem' }} onClick={() => setModal(category.id, 'deleted')}>削除</Button>
                        </div>
                    </div>
                ))}
                <div className='mt-12'>
                    <form action={createCategory}>
                        <FormControl>
                            <Input type="text" name="name" placeholder="新規カテゴリー名を入力" className='mr-4 w-3/4' />
                            <MyButton className='w-1/4' type="submit" disabled={status !== 'idle'}>
                                {status === 'idle' && '追加'}
                                {status === 'submitting' && <LoadingIcon />}
                                {status === 'error' && 'エラー'}
                                {status === 'success' && '完了'}
                            </MyButton>
                        </FormControl>
                    </form>
                </div>
            </div>
        </>
    );
}
