import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Tracking by ID (could be accessed by partners or guests with valid ID)
export async function GET(request: Request, { params }: { params: { id: string } }) {
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
