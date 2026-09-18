import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyCitizenToken } from '@/lib/citizen-auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('citizen-token')?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const payload = verifyCitizenToken(token)
    if (!payload) {
      return NextResponse.json({ user: null })
    }

    const user = await prisma.citizenUser.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ user: null })
  }
}

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('citizen-token')
  return response
}
