import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { getUser } from './app/lib/auth'
import axios from 'axios';
import { cookies } from 'next/headers';

 
// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const res = await fetch(`${process.env.API_URL}/user`, {
        method: 'GET',
        headers: {
            Cookie: `laravel_session=${cookies().get("laravel_session")?.value}`,
            referer: process.env.APP_URL ?? '',
            origin: process.env.APP_URL ?? '',
            Accept: 'application/json'

        },
        credentials: 'include'
    });
    const data = await res.json()
    // console.log('data', data)
    if(req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        if (res.status !== 401) {
            return NextResponse.redirect(new URL('/user', req.url))
        } else {
            return NextResponse.next()
        }
    } else {
        if (res.status !== 401) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/user', '/login', '/register', '/user', '/user/:path*', '/materials/:path*'],
}