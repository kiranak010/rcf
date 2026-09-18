import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const token = cookies().get('rcf-enterprise-session')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  try {
    const profile = await prisma.partnerProfile.findUnique({
      where: { userId: decoded.userId }
    })

    if (!profile) {
      return NextResponse.json({ error: 'Partner profile not found' }, { status: 404 })
    }

    const shipments = await prisma.shipment.findMany({
      where: { partnerProfileId: profile.id },
      include: { events: { orderBy: { timestamp: 'asc' } } },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ items: shipments })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Tracking by ID (could be accessed by partners or guests with valid ID)
export async function GET_BY_ID(request: Request, { params }: { params: { id: string } }) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { trackingId: params.id },
      include: { events: { orderBy: { timestamp: 'asc' } } }
    })

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
    }

    return NextResponse.json({ item: shipment })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
