'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { http } from '@/app/lib/http';
import Button from '../../atoms/Button';
import Link from 'next/link';
import { csrf } from '@/app/lib/csrf';
import { Notification } from '@/app/types/Notification';

interface Props {
  notifications: Notification[];
}

const NotificationAllList = ({notifications}: Props) => {
  const [newNotifications, setNewNotifications] = useState<Notification[]>(notifications);
  const markAsRead = async (id: number) => {
    await csrf();
    const res = await http.post(`/notifications/${id}/read`);
    //既読にした通知のreadを1に変更
    setNewNotifications(notifications.map(n => n.id === id ? {...n, read: 1} : n));
  };

  return (
    <div>
      <ul>
        {newNotifications.map(notification => (
          <li key={notification.id} className='py-2 mb-4 border-b-2 border-main flex'>
            <div>
              {notification.type === 'follow' && (
                <>
                <Link className='underline text-main' href={`/users/${notification.data.follower_id}`}>{notification.data.follower_name}</Link>
                さんにフォローされたよ！
                </>
              )}
              {notification.type === 'like' && (
                <>
                  <Link className='underline text-main' href={`/materials/${notification.data.material_id}`}>{notification.data.material_name}</Link>
                  が{notification.data.like_count}つのいいねをもらったよ！
                </>
              )}
              {notification.type === 'favorite' && (
                <>
                  <Link className='underline text-main' href={`/materials/${notification.data.material_id}`}>{notification.data.material_name}</Link>
                  が{notification.data.favorite_count}人にお気に入り登録されたよ！
                </>
              )}
              {notification.type === 'first_login' && (
                <>
                  登録ありがとう！「素材をアップロードする」から素材を沢山の人に共有しよう！
                </>
              )}
              {notification.type === 'new_material' && (
                <>
                  {notification.data.author_name}さんが新しく「<Link className='underline text-main' href={`/materials/${notification.data.material_id}`}>{notification.data.material_name}</Link>」を投稿したよ！
                </>
              )}
            </div>
            {notification.read == 0 && <Button className='text-sm ml-auto !px-2 ml-4 shrink-0' onClick={() => markAsRead(notification.id)}>既読にする</Button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationAllList;
