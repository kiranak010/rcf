import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  try {
    const ticket = await prisma.supportTicket.findFirst({
      where: { id: params.id, userId: decoded.userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } }
    })

    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    return NextResponse.json({ ticket, messages: ticket.messages })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded) return NextResponse.json({ error: 'Invalid session' }, { status: 401 })

  try {
    const body = await request.json()
    const { message } = body

    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 })

    const ticket = await prisma.supportTicket.findFirst({
      where: { id: params.id, userId: decoded.userId }
    })

    if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })

    const msg = await prisma.ticketMessage.create({
      data: {
        ticketId: params.id,
        senderId: decoded.userId,
        message
      }
    })

    return NextResponse.json({ msg })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
