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

    const profile = await prisma.partnerProfile.update({
      where: { userId: decoded.userId },
      data: {
        ...body,
        status: 'UNDER_REVIEW',
        onboardingStep: 7
      },
    })

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId: decoded.userId,
        message: 'Your onboarding application has been submitted and is now under review.',
        type: 'KYC',
      }
    })

    return NextResponse.json({
      success: true,
      profile,
      referenceId: profile.partnerId
    })
  } catch (error) {
    console.error('Submit profile error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
