// コメント一覧に複数選択と一括ステータス変更＋モーダル確認機能を追加
'use client'
import React, { useEffect, useState } from 'react';
import { Pagination } from '@/app/types/Material';
import { http } from '@/app/lib/http';
import { Button, Checkbox } from '@mui/material';
import Modal from '../../molecules/Modal';
import LoadingIcon from '../../atoms/Icons/LoadingIcons';
import Link from 'next/link';
import { toDateString } from '@/app/lib/functions/toDateString';
import { Comment } from '@/app/types/Comment';
import { getComment } from '@/app/lib/comment';
import { csrf } from '@/app/lib/csrf';
import SearchForm from '../SearchForm';
import { search } from '@/app/lib/search';

interface UpdateData {
    id: number | string;
    status: 'active' | 'inactive' | 'deleted';
}

const textMap = {
    active: 'アクティブ',
    inactive: '凍結',
    deleted: '削除'
};

export default function AdminCommentsTableClient() {
    const [commentsPagenation, setCommentsPagenation] = useState<Pagination<Comment> | null>(null);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState<UpdateData | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
    const [page, setPage] = useState(1);

    const [selectedIds, setSelectedIds] = useState<(number | string)[]>([]);
    const [bulkStatus, setBulkStatus] = useState<'active' | 'inactive' | 'deleted'>('active');
    const [isBulkMode, setIsBulkMode] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            const res = await http.get(`/comments?page=${page}`);
            setCommentsPagenation(res.data);
        };
        fetchComments();
    }, [page]);

    const updateStatus = async (id: number | string, status: string) => {
        setStatus('submitting');
        const comment = await getComment(id);
        try {
            await csrf();
            await http.put(`/comments/${id}`, {
                status: status,
                material_id: comment.material_id,
                user_id: comment.user_id,
                content: comment.content,
            });
            const res = await http.get(`/comments?page=${page}`);
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
    };

    const handleBulkUpdateConfirmed = async () => {
        setStatus('submitting');
        try {
            await csrf();
            for (const id of selectedIds) {
                const comment = await getComment(id);
                await http.put(`/comments/${id}`, {
                    status: bulkStatus,
                    material_id: comment.material_id,
                    user_id: comment.user_id,
                    content: comment.content,
                });
            }
            const res = await http.get(`/comments?page=${page}`);
            setCommentsPagenation(res.data);
            setSelectedIds([]);
            setStatus('success');
        } catch (e) {
            setStatus('error');
        } finally {
            setTimeout(() => {
                setOpen(false);
                setUpdateData(null);
                setStatus('idle');
            }, 1000);
        }
    };

    const setModal = (id: number | string, status: 'active' | 'inactive' | 'deleted') => {
        setUpdateData({ id, status });
        setIsBulkMode(false);
        setOpen(true);
    };

    const openBulkModal = () => {
        setUpdateData({ id: 0, status: bulkStatus });
        setIsBulkMode(true);
        setOpen(true);
    };

    const handleSearch = async (query: string) => {
        const data = await search<Comment>(query, 'comments');
        setCommentsPagenation(data);
    };

    return (
        <>
            {updateData && (
                <Modal open={open} setOpen={setOpen}>
                    <div>
                        {(status === 'idle' || status === 'submitting') && (
                            <>
                                <p>
                                    本当に{textMap[updateData.status]}
                                    {isBulkMode ? `（${selectedIds.length}件）` : `（ID: ${updateData.id}）`}しますか？
                                </p>
                                <Button
                                    variant="contained"
                                    color='warning'
                                    onClick={() => {
                                        if (isBulkMode) {
                                            handleBulkUpdateConfirmed();
                                        } else {
                                            updateStatus(updateData.id, updateData.status);
                                        }
                                    }}
                                    sx={{ margin: '.25rem' }}
                                >
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

                {commentsPagenation && commentsPagenation.data.length > 0 && (
                    <div className="flex items-center gap-2 my-4">
                        <select
                            value={bulkStatus}
                            onChange={(e) => setBulkStatus(e.target.value as UpdateData['status'])}
                            className="border p-1"
                        >
                            <option value="active">アクティブにする</option>
                            <option value="deleted">削除する</option>
                        </select>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={selectedIds.length === 0}
                            onClick={openBulkModal}
                        >
                            一括実行（{selectedIds.length}件）
                        </Button>
                    </div>
                )}

                <div className='flex text-center'>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-12'>
                        {/* <input
                            type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedIds(commentsPagenation?.data.map(c => c.id) || []);
                                } else {
                                    setSelectedIds([]);
                                }
                            }}
                            checked={commentsPagenation?.data.length > 0 && selectedIds.length === commentsPagenation.data.length}
                        /> */}
                    </div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-64'>素材名</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-72'>コメント</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-48'>投稿ユーザー</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-32'>ステータス</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-28'>投稿日</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont grow'>操作</div>
                </div>

                {commentsPagenation && commentsPagenation.data.map((comment) => (
                    <div key={comment.id} className='flex py-4 border-b border-main'>
                        <div className='w-12 text-center'>
                            <Checkbox
                                checked={selectedIds.includes(comment.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedIds([...selectedIds, comment.id]);
                                    } else {
                                        setSelectedIds(selectedIds.filter(id => id !== comment.id));
                                    }
                                }}
                            />
                        </div>
                        <div className='w-64 text-center'>
                            <Link href={`/materials/${comment.material_id}`} target='_blank'>{comment.material.name}</Link>
                        </div>
                        <div className='w-72 text-center'>{comment.content}</div>
                        <div className='w-48 text-center'>{comment.user.name}</div>
                        <div className='w-32 text-center'>{textMap[comment.status]}</div>
                        <div className='w-28 text-center'>{toDateString(comment.created_at)}</div>
                        <div className='text-center grow'>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(comment.id, 'deleted')}>削除</Button>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(comment.id, 'active')}>復元</Button>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center my-4">
                    {(commentsPagenation && commentsPagenation.total > commentsPagenation.per_page) && (
                        <div className="flex">
                            <Button variant='outlined' onClick={() => setPage(page - 1)} sx={{ margin: '.25rem' }} disabled={page === 1}>←</Button>
                            <Button variant='outlined' onClick={() => setPage(page + 1)} sx={{ margin: '.25rem' }} disabled={page === commentsPagenation.last_page}>→</Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
