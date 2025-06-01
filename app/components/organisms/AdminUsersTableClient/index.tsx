'use client'
import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from '@mui/material';
import Link from 'next/link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Pagination } from '@/app/types/Material';
import { User } from '@/app/types/User';
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
}

export default function AdminUsersTableClient() {
  const [users, setUsers] = useState<Pagination<User> | null>(null);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateData | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [page, setPage] = useState(1);

  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [bulkStatus, setBulkStatus] = useState<'active' | 'inactive' | 'deleted'>('active');
  const [isBulkMode, setIsBulkMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await http.get(`/users?page=${page}`);
      setUsers(res.data);
    };
    fetchUsers();
  }, [page]);

  const updateStatus = async (id: number, status: string) => {
    setStatus('submitting');
    try {
      await csrf();
      await http.put(`/admin/users/${id}`, { status });
      const res = await http.get(`/users?page=${page}`);
      setUsers(res.data);
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
    if (selectedUserIds.length === 0) return;
    setStatus('submitting');
    try {
      await csrf();
      await Promise.all(
        selectedUserIds.map(id => http.put(`/admin/users/${id}`, { status: bulkStatus }))
      );
      const res = await http.get(`/users?page=${page}`);
      setUsers(res.data);
      setSelectedUserIds([]);
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
    const data = await search<User>(query, 'users');
    setUsers(data);
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
                  {isBulkMode
                    ? `（${selectedUserIds.length}件）`
                    : `（ID: ${updateData.id}）`}
                  にしますか？
                </p>
                <Button
                  variant="contained"
                  color="warning"
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
                <Button variant="outlined" onClick={() => setOpen(false)} sx={{ margin: '.25rem' }}>
                  キャンセル
                </Button>
              </>
            )}
            {status === 'error' && (
              <>
                <p>エラーが発生しました</p>
                <Button variant="outlined" onClick={() => setOpen(false)} sx={{ margin: '.25rem' }}>
                  閉じる
                </Button>
              </>
            )}
            {status === 'success' && <p>更新が完了しました</p>}
          </div>
        </Modal>
      )}
      <div className="bg-white">
        <SearchForm onSearch={handleSearch} />

        {users && users.data.length > 0 && (
          <div className="flex items-center gap-2 my-4">
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value as UpdateData['status'])}
              className="border p-1"
            >
              <option value="active">アクティブにする</option>
              <option value="inactive">凍結する</option>
              <option value="deleted">削除する</option>
            </select>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedUserIds.length === 0}
              onClick={openBulkModal}
            >
              一括実行（{selectedUserIds.length}件）
            </Button>
          </div>
        )}

        <div className="flex text-center">
          <div className="p-2 bg-main text-main-cont border border-main-cont w-12">
            {/* <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedUserIds(users?.data.map(u => u.id) || []);
                } else {
                  setSelectedUserIds([]);
                }
              }}
              checked={users?.data.length > 0 && selectedUserIds.length === users.data.length}
            /> */}
          </div>
          <div className="p-2 bg-main text-main-cont border border-main-cont w-60">ユーザー名</div>
          <div className="p-2 bg-main text-main-cont border border-main-cont w-60">メールアドレス</div>
          <div className="p-2 bg-main text-main-cont border border-main-cont w-40">最終ログイン日</div>
          <div className="p-2 bg-main text-main-cont border border-main-cont w-32">ステータス</div>
          <div className="p-2 bg-main text-main-cont border border-main-cont grow">操作</div>
        </div>

        {users &&
          users.data.map((user) => (
            <div key={user.id} className="flex py-4 border-b border-main">
              <div className="w-12 text-center">
                <Checkbox
                  checked={selectedUserIds.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUserIds([...selectedUserIds, user.id]);
                    } else {
                      setSelectedUserIds(selectedUserIds.filter(id => id !== user.id));
                    }
                  }}
                />
              </div>
              <div className="w-60 text-center">
                <Link href={`/users/${user.id}`} target="_blank" className="underline">
                  {user.name}
                </Link>
              </div>
              <div className="w-60 text-center">{user.email}</div>
              <div className="w-40 text-center">{toDateString(user.last_login_at)}</div>
              <div className="w-32 text-center">{textMap[user.status]}</div>
              <div className="text-center grow">
                <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(user.id, 'deleted')}>
                  削除
                </Button>
                <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(user.id, 'active')}>
                  復元
                </Button>
                <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(user.id, 'inactive')}>
                  凍結
                </Button>
                <Button variant="outlined" sx={{ margin: '.25rem' }} onClick={() => setModal(user.id, 'active')}>
                  凍結解除
                </Button>
                <Button variant="outlined" sx={{ margin: '.25rem' }}>
                  <Link href={`/admin/users/edit/${user.id}`}>情報更新</Link>
                </Button>
              </div>
            </div>
          ))}

        <div className="flex justify-center my-4">
          {users && users.total > users.per_page && (
            <div className="flex">
              <Button
                variant="outlined"
                onClick={() => setPage(page - 1)}
                sx={{ margin: '.25rem' }}
                disabled={page === 1}
              >
                ←
              </Button>
              <Button
                variant="outlined"
                onClick={() => setPage(page + 1)}
                sx={{ margin: '.25rem' }}
                disabled={page === users.last_page}
              >
                →
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
