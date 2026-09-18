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
    const bankDetail = await prisma.bankDetail.findFirst({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' }
    })

    if (!bankDetail) return NextResponse.json({ item: null })

    // Mask the account number for security (e.g., XXXX XXXX 1234)
    const accNo = bankDetail.accountNumber
    const maskedAccount = accNo.length > 4
      ? `XXXX XXXX ${accNo.slice(-4)}`
      : accNo

    return NextResponse.json({
      item: {
        ...bankDetail,
        accountNumber: maskedAccount
      }
    })
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

    // Find partner profile to link the bank detail
    const profile = await prisma.partnerProfile.findUnique({
      where: { userId: decoded.userId }
    })

    if (!profile) return NextResponse.json({ error: 'Partner profile not found' }, { status: 404 })

    const bankDetail = await prisma.bankDetail.create({
      data: {
        ...body,
        userId: decoded.userId,
        partnerProfileId: profile.id,
        status: 'PENDING' // All new bank details must be verified
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: decoded.userId,
        action: 'BANK_DETAIL_SUBMITTED',
        entity: 'BankDetail',
        entityId: bankDetail.id,
        details: 'Partner submitted new bank details for verification'
      }
    })

    return NextResponse.json({ success: true, item: bankDetail })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit bank details' }, { status: 500 })
  }
}
