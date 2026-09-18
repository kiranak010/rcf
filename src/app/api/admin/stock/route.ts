import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const requests = await prisma.stockRequest.findMany({
      where: {
        status: { in: ['SUBMITTED', 'UNDER_REVIEW'] }
      },
      include: { partnerProfile: { include: { user: true } } },
      orderBy: { createdAt: 'asc' }
    })
    return NextResponse.json({ items: requests })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { requestId, status, approvedQty } = body

    // 1. Update the request status
    const updatedRequest = await prisma.stockRequest.update({
      where: { id: requestId },
      data: {
        status,
        approvedQty: approvedQty ? parseFloat(approvedQty) : undefined
      }
    })

    // 2. If approved, create a shipment
    if (status === 'APPROVED' || status === 'PARTIALLY_APPROVED') {
      const qty = approvedQty || updatedRequest.quantity

      // Find partner profile
      const profile = await prisma.partnerProfile.findUnique({
        where: { id: updatedRequest.partnerProfileId }
      })

      const shipment = await prisma.shipment.create({
        data: {
          orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000), // Mock order link
          partnerProfileId: profile!.id,
          trackingId: `RCF-FRT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
          origin: 'Trombay Unit, Mumbai',
          destination: profile!.businessAddress,
          currentStatus: 'READY',
          dispatchDate: new Date(),
          expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
        }
      })

      // Create first shipment event
      await prisma.shipmentEvent.create({
        data: {
          shipmentId: shipment.id,
          status: 'READY',
          location: 'Trombay Warehouse',
          updatedBy: decoded.userId
        }
      })
    }

    // 3. Audit log
    await prisma.auditLog.create({
      data: {
        userId: decoded.userId,
        action: `STOCK_REQ_${status}`,
        entity: 'StockRequest',
        entityId: requestId,
        newValue: status
      }
    })

    return NextResponse.json({ success: true, request: updatedRequest })
  } catch (error) {
    console.error('Stock approval error:', error)
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 })
  }
}
