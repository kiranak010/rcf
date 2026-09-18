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
    const pendingPartners = await prisma.partnerProfile.findMany({
      where: { status: { in: ['PENDING', 'UNDER_REVIEW'] } },
      include: { user: true, kycDocuments: true },
      orderBy: { createdAt: 'asc' }
    })
    return NextResponse.json({ items: pendingPartners })
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
    const { partnerId, status, notes } = body

    const profile = await prisma.partnerProfile.update({
      where: { id: partnerId },
      data: { status }
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        userId: decoded.userId,
        action: `KYC_${status}`,
        entity: 'PartnerProfile',
        entityId: partnerId,
        newValue: status,
        details: notes
      }
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update KYC status' }, { status: 500 })
  }
}
