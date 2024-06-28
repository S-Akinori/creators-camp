'use client'
import React, { useEffect, useState } from 'react';
import { Pagination } from '@/app/types/Material';
import { http } from '@/app/lib/http';
import { Button } from '@mui/material';
import Modal from '../../molecules/Modal';
import LoadingIcon from '../../atoms/Icons/LoadingIcons';
import Link from 'next/link';
import { toDateString } from '@/app/lib/functions/toDateString';
import { Comment } from '@/app/types/Comment';
import { getComment } from '@/app/lib/comment';

interface UpdateData {
    id: number| string;
    status: 'active' | 'inactive' | 'deleted';
}

const textMap = {
    active: 'アクティブ',
    inactive: '凍結',
    deleted: '削除'
}

export default function AdminCommentsTableClient() {
    const [commentsPagenation, setCommentsPagenation] = useState<Pagination<Comment> | null>(null);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState<UpdateData | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            const res = await http.get(`/comments?page=${page}`);
            setCommentsPagenation(res.data);
        }
        fetchNews()
    }, [page]);

    const updateStatus = async (id: number | string, status: string) => {
        setStatus('submitting')
        await csrf()
        const comment = await getComment(id);
        try {
            await http.put(`/comments/${id}`, {
                status: status,
                material_id: comment.material_id,
                user_id: comment.user_id,
                content: comment.content,
            });
            const res = await http.get('/comments?page=${page}');
            setCommentsPagenation(res.data);
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

    const setModal = (id: number | string, status: 'active' | 'inactive' | 'deleted') => {
        setUpdateData({ id, status });
        setOpen(true);
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
            <div className='bg-white'>
                <div className='flex text-center'>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-12'>ID</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-64'>素材名</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-72'>コメント</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-48'>投稿ユーザー</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-32'>ステータス</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-28'>投稿日</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont grow'>操作</div>
                </div>
                {commentsPagenation && commentsPagenation.data.map((comment) => (
                    <div key={comment.id} className='flex py-4 border-b border-main'>
                        <div className='w-12 text-center'>{comment.id}</div>
                        <div className='w-64 text-center'>{comment.material.name}</div>
                        <div className='w-72 text-center'>{comment.content}</div>
                        <div className='w-48 text-center'>{comment.user.name}</div>
                        <div className='w-32 text-center'>{textMap[comment.status]}</div>
                        <div className='w-28 text-center'>{toDateString(comment.created_at)}</div>
                        <div className=' text-center grow'>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(comment.id, 'deleted')}>削除</Button>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(comment.id, 'active')}>復元</Button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center my-4">
                    {(commentsPagenation && commentsPagenation.total > commentsPagenation.per_page) && (
                        <div className="flex">
                            <Button variant='outlined' onClick={() => setPage(page - 1)} sx={{margin: '.25rem'}} disabled={page === 1}>←</Button>
                            {/* {Array.from({ length: users.total - 1 }, (_, index) => (
                                <Button key={index} href={`/materials/users&page=${index + 1}`} sx={{margin: '.25rem'}}>
                                    {index + 1}
                                </Button>
                            ))} */}
                            <Button variant='outlined' onClick={() => setPage(page + 1)} sx={{margin: '.25rem'}} disabled={page === commentsPagenation.last_page} >→</Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
