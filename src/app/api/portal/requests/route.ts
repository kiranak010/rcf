import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const token = cookies().get('rcf-enterprise-session')?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { productId, quantity, unit, requiredDate, priority, deliveryLocation, remarks } = body

    // Get user's partner profile
    const profile = await prisma.partnerProfile.findUnique({
      where: { userId: decoded.userId }
    })

    if (!profile) {
      return NextResponse.json({ error: 'Partner profile not found' }, { status: 404 })
    }

    // Generate a unique Request ID
    const requestId = `SR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`

    const requestItem = await prisma.stockRequest.create({
      data: {
        partnerProfileId: profile.id,
        productId,
        quantity: parseFloat(quantity),
        unit,
        requiredDate: new Date(requiredDate),
        priority,
        deliveryLocation,
        remarks,
        requestId,
        status: 'SUBMITTED'
      }
    })

    // Create a notification for the admin/ops team (mocked as a general notification)
    await prisma.notification.create({
      data: {
        userId: decoded.userId, // In reality, this would go to the admin user
        message: `New stock request ${requestId} submitted for ${quantity} ${unit}.`,
        type: 'STOCK',
      }
    })

    return NextResponse.json({
      success: true,
      item: requestItem
    })
  } catch (error) {
    console.error('Stock request error:', error)
    return NextResponse.json({ error: 'Failed to create stock request' }, { status: 500 })
  }
}

export async function GET() {
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

    const requests = await prisma.stockRequest.findMany({
      where: { partnerProfileId: profile.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ items: requests })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
