import { NextResponse } from 'next/server'
import { signIn } from '@/lib/auth'
import { auth } from 'firebase-admin'
import { initFirebaseAdmin } from '@/lib/firebase-admin'

initFirebaseAdmin()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email e senha são obrigatórios' },
                { status: 400 }
            )
        }

        const { user, error } = await signIn(email, password)

        if (error) {
            console.error('Sign in error:', error)
            return NextResponse.json(
                { error },
                { status: 401 }
            )
        }

        if (!user) {
            return NextResponse.json(
                { error: 'Usuário não encontrado' },
                { status: 401 }
            )
        }

        const idToken = await user.getIdToken()
        const expiresIn = 60 * 60 * 24 * 7 * 1000 // 1 week
        const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn })

        const response = NextResponse.json({ user })
        response.cookies.set('session', sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        })

        console.log('Session cookie set successfully')
        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Erro inesperado. Tente novamente.' },
            { status: 500 }
        )
    }
} 