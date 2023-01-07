import { NextRequest, NextResponse } from 'next/server';
import cors from 'cors'


export function middleware(request, res) {
    if (request.nextUrl.pathname.startsWith('/about')) {
        // This logic is only applied to /about
    }

    if (request.nextUrl.pathname.includes('/api')) {
        // This logic is only applied to /dashboard

    }
}