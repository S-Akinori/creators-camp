'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { http } from '@/app/lib/http';
import Button from '../../atoms/Button';
import Link from 'next/link';
import { csrf } from '@/app/lib/csrf';

interface Notification {
  id: number;
  type: string;
  data: any;
  read: boolean;
}

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await http.get('/notifications');
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    await csrf();
    const res = await http.post(`/notifications/${id}/read`);
    setNotifications(notifications.filter(n => n.id !== id)); // 既読にした通知をリストから削除
  };

  console.log(notifications);

  return (
    <div>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className='py-2 mb-4 border-b-2 border-main flex'>
            <div>
              {notification.type === 'follow' && (
                <>
                <Link className='underline text-main' href={`/user/${notification.data.follower_id}`}>{notification.data.follower_name}</Link>
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
            <Button className='text-sm ml-auto !px-2 ml-4 shrink-0' onClick={() => markAsRead(notification.id)}>既読にする</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
