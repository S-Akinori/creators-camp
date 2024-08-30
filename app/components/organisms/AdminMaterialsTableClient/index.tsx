'use client'
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Material, Pagination } from '@/app/types/Material';
import { User } from '@/app/types/User';
import { http } from '@/app/lib/http';
import { Button } from '@mui/material';
import Modal from '../../molecules/Modal';
import LoadingIcon from '../../atoms/Icons/LoadingIcons';
import Link from 'next/link';
import { toDateString } from '@/app/lib/functions/toDateString';
import { csrf } from '@/app/lib/csrf';
import { search } from '@/app/lib/search';
import SearchForm from '../SearchForm';

interface UpdateData {
    id: number;
    status: 'active' | 'inactive' | 'deleted';
}

const textMap = {
    active: 'アクティブ',
    inactive: '凍結',
    deleted: '削除'
}

export default function AdminMaterialsTableClient() {
    const [materialsPagenation, setMaterialsPagenation] = useState<Pagination<Material> | null>(null);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState<UpdateData | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            const res = await http.get(`/materials?page=${page}`);
            setMaterialsPagenation(res.data);
        }
        fetchNews()
    }, [page]);

    const updateStatus = async (id: number, status: string) => {
        setStatus('submitting')
        try {
            await csrf()
            await http.put(`/admin/materials/${id}`, { status });
            const res = await http.get('/materials?page=${page}');
            setMaterialsPagenation(res.data);
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

    const handleSearch = async (query: string) => {
        const data = await search<Material>(query, 'materials');
        setMaterialsPagenation(data);
      };

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
            <div className='bg-white'>
                <SearchForm onSearch={handleSearch} />
                <div className='flex text-center'>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-12'>ID</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-60'>素材名</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-52'>投稿ユーザー</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-40'>タグ</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-32'>ステータス</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-28'>投稿日</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-28'>最終更新日</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont grow'>操作</div>
                </div>
                {materialsPagenation && materialsPagenation.data.map((material) => (
                    <div key={material.id} className='flex py-4 border-b border-main'>
                        <div className='w-12 text-center'>{material.id}</div>
                        <div className='w-60 text-center'><Link href={`/materials/${material.id}`} target='_blank'>{material.name}</Link></div>
                        <div className='w-52 text-center'>{material.user.name}</div>
                        <div className='w-40 text-center'>{material.category ? material.category.name : '無し'}</div>
                        <div className='w-32 text-center'>{textMap[material.status]}</div>
                        <div className='w-28 text-center'>{toDateString(material.created_at)}</div>
                        <div className='w-28 text-center'>{toDateString(material.updated_at)}</div>
                        <div className=' text-center grow'>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(material.id, 'deleted')}>削除</Button>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(material.id, 'active')}>復元</Button>
                            <Button variant="outlined" sx={{ margin: '.25rem' }}><Link href={`/admin/materials/edit/${material.id}`}>情報更新</Link></Button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center my-4">
                    {(materialsPagenation && materialsPagenation.total > materialsPagenation.per_page) && (
                        <div className="flex">
                            <Button variant='outlined' onClick={() => setPage(page - 1)} sx={{margin: '.25rem'}} disabled={page === 1}>←</Button>
                            {/* {Array.from({ length: users.total - 1 }, (_, index) => (
                                <Button key={index} href={`/materials/users&page=${index + 1}`} sx={{margin: '.25rem'}}>
                                    {index + 1}
                                </Button>
                            ))} */}
                            <Button variant='outlined' onClick={() => setPage(page + 1)} sx={{margin: '.25rem'}} disabled={page === materialsPagenation.last_page} >→</Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
