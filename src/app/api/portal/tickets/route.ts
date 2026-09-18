import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  try {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ items: tickets })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  try {
    const body = await request.json()
    const { category, subject, description, priority } = body

    if (!category || !subject || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        userId: decoded.userId,
        category,
        subject,
        description,
        priority: priority || 'NORMAL',
        status: 'OPEN'
      }
    })

    return NextResponse.json({ ticket })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
  }
}
