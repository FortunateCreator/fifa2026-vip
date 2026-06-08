import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('session')?.value

    if (sessionId) {
      deleteSession(sessionId)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
