import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth } from 'firebase-admin'
import { initFirebaseAdmin } from '@/lib/firebase-admin'

initFirebaseAdmin()

export async function GET() {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get('session')?.value

        if (!session) {
            return NextResponse.json(
                { verified: false, error: 'No session found' },
                { status: 401 }
            )
        }

        const decodedClaims = await auth().verifySessionCookie(session, true)

        return NextResponse.json({
            verified: true,
            user: {
                uid: decodedClaims.uid,
                email: decodedClaims.email
            }
        })
    } catch {
        return NextResponse.json(
            { verified: false, error: 'Invalid session' },
            { status: 401 }
        )
    }
} 