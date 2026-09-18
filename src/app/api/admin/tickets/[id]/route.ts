import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { name: true, email: true } },
        messages: { orderBy: { createdAt: 'asc' } }
      }
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
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { message } = body

    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 })

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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { status, assignedTo } = body

    const oldTicket = await prisma.supportTicket.findUnique({
      where: { id: params.id }
    })

    if (!oldTicket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })

    const updatedTicket = await prisma.supportTicket.update({
      where: { id: params.id },
      data: {
        status: status || oldTicket.status,
        assignedTo: assignedTo || oldTicket.assignedTo
      }
    })

    // Audit Logging
    if (status && status !== oldTicket.status) {
      await prisma.auditLog.create({
        data: {
          userId: decoded.userId,
          action: 'TICKET_STATUS_CHANGE',
          entity: 'SupportTicket',
          entityId: params.id,
          prevValue: oldTicket.status,
          newValue: status
        }
      })
    }

    if (assignedTo && assignedTo !== oldTicket.assignedTo) {
      await prisma.auditLog.create({
        data: {
          userId: decoded.userId,
          action: 'TICKET_ASSIGNMENT_CHANGE',
          entity: 'SupportTicket',
          entityId: params.id,
          prevValue: oldTicket.assignedTo || 'Unassigned',
          newValue: assignedTo
        }
      })
    }

    return NextResponse.json({ ticket: updatedTicket })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 })
  }
}
