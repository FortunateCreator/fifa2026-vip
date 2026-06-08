import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('session')?.value

    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const session = getSession(sessionId)
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({
      user: {
        id: session.user_id,
        email: session.email,
        name: session.name,
      },
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
