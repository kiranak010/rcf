import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('rcf-enterprise-session')?.value

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { partnerProfile: true }
    })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        partnerId: user.partnerProfile?.partnerId
      }
    })
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 500 })
  }
}

export async function POST() {
  // Logout
  const response = NextResponse.json({ success: true })
  response.cookies.set('rcf-enterprise-session', '', { maxAge: 0 })
  return response
}
