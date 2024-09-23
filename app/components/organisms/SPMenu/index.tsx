'use client'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import Link from 'next/link';
import Button from '../../atoms/Button';
import { getUser } from '@/app/lib/auth';
import GlobalSearchForm from '../GlobalSearchForm';

interface Props {
    isAuth: boolean;
}

const SPMenu = ({isAuth}: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={clsx(["fixed p-8 inset-0 bg-white z-50 transition duration-500", open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'])}>
                <div className="absolute top-4 right-4">
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon className="fill-main" />
                    </IconButton>
                </div>
                <div className='mt-12'>
                    <div className='border-b-2 border-main pb-4 mb-4'>
                        <GlobalSearchForm />
                    </div>
                    <ul>
                        {isAuth && (
                            <li className="mb-8">
                                <Button onClick={() => setOpen(false)} href='/user' className='w-full text-center'>マイページ</Button>
                            </li>
                        )}
                        {!isAuth && (
                            <li className="mb-8 text-center">
                                <Button onClick={() => setOpen(false)} href='/register' className='mx-4'>新規登録</Button>
                                <Button onClick={() => setOpen(false)} href='/register' className='mx-4'>ログイン</Button>
                            </li>
                        )}
                        <li className="mb-8">
                            <Link onClick={() => setOpen(false)} href="/materials">素材一覧</Link>
                        </li>
                        <li className="mb-8">
                            <Link onClick={() => setOpen(false)} href="/users">ユーザー一覧</Link>
                        </li>
                        <li className="mb-8">
                            <Link onClick={() => setOpen(false)} href="/about">サイトについて</Link>
                        </li>
                        <li className="mb-8">
                            <Link onClick={() => setOpen(false)} href="/toc">ご利用規約</Link>
                        </li>
                        <li className="mb-8">
                            <Link onClick={() => setOpen(false)} href="/sponser">スポンサー</Link>
                        </li>
                        <li className="mb-8">
                            <Link onClick={() => setOpen(false)} href="/contact">お問い合わせ</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <IconButton onClick={() => setOpen(true)}>
                    <MenuIcon className="fill-main" />
                </IconButton>
            </div>
        </>
    )
}

export default SPMenu;