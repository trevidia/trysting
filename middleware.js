

export function middleware(request, response) {
    const pathName = request.nextUrl.pathname
    if (!pathName.includes('/api') && pathName.includes('pages')) {
        // This logic is only applied to /about


    }

    if (request.nextUrl.pathname.includes('/api')) {
        // This logic is only applied to /api

    }
}