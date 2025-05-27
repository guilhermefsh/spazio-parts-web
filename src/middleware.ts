import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that don't require authentication
const publicPaths = ['/admin/login']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow public paths
    if (publicPaths.includes(pathname)) {
        // If user is already authenticated, redirect to admin
        const session = request.cookies.get('session')?.value
        if (session) {
            try {
                const verifyUrl = new URL('/api/auth/verify', request.url)
                const response = await fetch(verifyUrl, {
                    headers: {
                        Cookie: `session=${session}`,
                    },
                    cache: 'no-store',
                })

                const data = await response.json()
                if (response.ok && data.verified) {
                    return NextResponse.redirect(new URL('/admin', request.url))
                }
            } catch (error) {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }
        }
        return NextResponse.next()
    }

    // Check if the path starts with /admin
    if (pathname.startsWith('/admin')) {
        const session = request.cookies.get('session')?.value

        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            const verifyUrl = new URL('/api/auth/verify', request.url)
            const response = await fetch(verifyUrl, {
                headers: {
                    Cookie: `session=${session}`,
                },
                cache: 'no-store',
            })

            const data = await response.json()

            if (!response.ok || !data.verified) {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }

            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/admin/login',
    ],
} 