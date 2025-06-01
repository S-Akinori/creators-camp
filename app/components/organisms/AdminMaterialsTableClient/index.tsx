// 修正済みコード：素材一覧テーブルに複数選択＆一括ステータス変更機能を追加
'use client'
import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import Link from 'next/link';

import { Material, Pagination } from '@/app/types/Material';
import { http } from '@/app/lib/http';
import { csrf } from '@/app/lib/csrf';
import { search } from '@/app/lib/search';
import { toDateString } from '@/app/lib/functions/toDateString';

import Modal from '../../molecules/Modal';
import LoadingIcon from '../../atoms/Icons/LoadingIcons';
import SearchForm from '../SearchForm';

interface UpdateData {
    id: number;
    status: 'active' | 'inactive' | 'deleted';
}

const textMap = {
    active: 'アクティブ',
    inactive: '凍結',
    deleted: '削除'
};

export default function AdminMaterialsTableClient() {
    const [materialsPagination, setMaterialsPagination] = useState<Pagination<Material> | null>(null);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState<UpdateData | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
    const [page, setPage] = useState(1);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkStatus, setBulkStatus] = useState<'active' | 'inactive' | 'deleted'>('active');
    const [isBulkMode, setIsBulkMode] = useState(false);

    useEffect(() => {
        const fetchMaterials = async () => {
            const res = await http.get(`/materials?page=${page}`);
            setMaterialsPagination(res.data);
        };
        fetchMaterials();
    }, [page]);

    const updateStatus = async (id: number, status: string) => {
        setStatus('submitting');
        try {
            await csrf();
            await http.put(`/admin/materials/${id}`, { status });
            const res = await http.get(`/materials?page=${page}`);
            setMaterialsPagination(res.data);
            setStatus('success');
            setTimeout(() => {
                setOpen(false);
                setUpdateData(null);
                setStatus('idle');
            }, 1000);
        } catch {
            setStatus('error');
        }
    };

    const handleBulkUpdateConfirmed = async () => {
        if (selectedIds.length === 0) return;
        setStatus('submitting');
        try {
            await csrf();
            await Promise.all(
                selectedIds.map(id => http.put(`/admin/materials/${id}`, { status: bulkStatus }))
            );
            const res = await http.get(`/materials?page=${page}`);
            setMaterialsPagination(res.data);
            setSelectedIds([]);
            setStatus('success');
        } catch {
            setStatus('error');
        } finally {
            setTimeout(() => {
                setOpen(false);
                setUpdateData(null);
                setStatus('idle');
            }, 1000);
        }
    };

    const setModal = (id: number, status: 'active' | 'inactive' | 'deleted') => {
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
        const data = await search<Material>(query, 'materials');
        setMaterialsPagination(data);
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

                {materialsPagination && materialsPagination.data.length > 0 && (
                    <div className="flex items-center gap-2 my-4">
                        <select
                            value={bulkStatus}
                            onChange={(e) => setBulkStatus(e.target.value as UpdateData['status'])}
                            className="border p-1"
                        >
                            <option value="active">アクティブにする</option>
                            {/* <option value="inactive">凍結する</option> */}
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
                                    setSelectedIds(materialsPagination?.data.map(m => m.id) || []);
                                } else {
                                    setSelectedIds([]);
                                }
                            }}
                            checked={materialsPagination?.data.length > 0 && selectedIds.length === materialsPagination.data.length}
                        /> */}
                    </div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-60'>素材名</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-52'>投稿ユーザー</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-40'>タグ</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-32'>ステータス</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-28'>投稿日</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont w-28'>最終更新日</div>
                    <div className='p-2 bg-main text-main-cont border border-main-cont grow'>操作</div>
                </div>

                {materialsPagination && materialsPagination.data.map((material) => (
                    <div key={material.id} className='flex py-4 border-b border-main'>
                        <div className='w-12 text-center'>
                            <Checkbox
                                checked={selectedIds.includes(material.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedIds([...selectedIds, material.id]);
                                    } else {
                                        setSelectedIds(selectedIds.filter(id => id !== material.id));
                                    }
                                }}
                            />
                        </div>
                        <div className='w-60 text-center'>
                            <Link href={`/materials/${material.id}`} target='_blank'>{material.name}</Link>
                        </div>
                        <div className='w-52 text-center'>{material.user.name}</div>
                        <div className='w-40 text-center'>{material.category ? material.category.name : '無し'}</div>
                        <div className='w-32 text-center'>{textMap[material.status]}</div>
                        <div className='w-28 text-center'>{toDateString(material.created_at)}</div>
                        <div className='w-28 text-center'>{toDateString(material.updated_at)}</div>
                        <div className='text-center grow'>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(material.id, 'deleted')}>削除</Button>
                            <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(material.id, 'active')}>復元</Button>
                            <Button variant="outlined" sx={{ margin: '.25rem' }}>
                                <Link href={`/admin/materials/edit/${material.id}`}>情報更新</Link>
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center my-4">
                    {(materialsPagination && materialsPagination.total > materialsPagination.per_page) && (
                        <div className="flex">
                            <Button variant='outlined' onClick={() => setPage(page - 1)} sx={{ margin: '.25rem' }} disabled={page === 1}>←</Button>
                            <Button variant='outlined' onClick={() => setPage(page + 1)} sx={{ margin: '.25rem' }} disabled={page === materialsPagination.last_page}>→</Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
