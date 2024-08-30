import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Middleware function
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const res = await fetch(`${process.env.API_URL}/user`, {
        method: 'GET',
        headers: {
            Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
            referer: process.env.APP_URL ?? '',
            origin: process.env.APP_URL ?? '',
            Accept: 'application/json',
        },
        credentials: 'include',
    });

    const data = await res.json();

    // ログインページまたは登録ページにアクセスした場合の処理
    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        if (res.status !== 401 && data.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', req.url));
        } else if (res.status !== 401) {
            return NextResponse.redirect(new URL('/user', req.url));
        } else {
            return NextResponse.next();
        }
    }

    // ユーザー詳細ページにアクセスした場合のステータスチェック
    if (req.nextUrl.pathname.startsWith('/user/')) {
        const userId = req.nextUrl.pathname.split('/')[2]; // `/user/[id]` から `id` を取得
        const userRes = await fetch(`${process.env.API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                Cookie: `re_creators_camp_session=${cookies().get("re_creators_camp_session")?.value}`,
                referer: process.env.APP_URL ?? '',
                origin: process.env.APP_URL ?? '',
                Accept: 'application/json',
            },
            credentials: 'include',
        });
        
        const userData = await userRes.json();
        
        if (userRes.status === 404 || userData.status !== 'active') {
            return NextResponse.redirect(new URL('/404', req.url));
        }
    }

    // その他のルートに対する処理
    if (res.status !== 401 && !data.email_verified_at) {
        return NextResponse.redirect(new URL('/login/email-verify', req.url));
    } else if (res.status !== 401) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/register',
        '/user',
        '/user/:path*',
        '/materials/[id]/:path*',
        '/admin',
        '/admin/:path*',
    ],
};
