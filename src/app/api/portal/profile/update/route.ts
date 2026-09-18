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
    const { onboardingStep, ...profileData } = body

    const profile = await prisma.partnerProfile.upsert({
      where: { userId: decoded.userId },
      update: {
        ...profileData,
        onboardingStep: onboardingStep,
      },
      create: {
        userId: decoded.userId,
        partnerId: `RCF-PRT-${Math.floor(100000 + Math.random() * 900000)}`,
        ...profileData,
        onboardingStep: onboardingStep,
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
