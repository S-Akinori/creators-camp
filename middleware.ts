import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { getUser } from './app/lib/auth'
import axios from 'axios';

const http = axios.create({
    baseURL: process.env.API_URL,
    responseType: 'json',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})
 
// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const res = await fetch(`${process.env.API_URL}/user`, {
        method: 'GET',
        headers: {
            Cookie: req.headers.get('cookie') ?? '',
            referer: req.headers.get('referer') ?? ''
        },
        credentials: 'include'
    });
    if(req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        if (res.status === 200) {
            return NextResponse.redirect(new URL('/user', req.url))
        } else {
            return NextResponse.next()
        }
    } else {
        if (res.status === 200) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/user', '/login', '/register', '/user/:path*'],
}