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
    const schemes = await prisma.farmerScheme.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ items: schemes })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const token = cookies().get('rcf-enterprise-session')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const decoded = verifyToken(token)
  if (!decoded || !decoded.role.includes('ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { schemeName, provider, eligibility, benefits, docsRequired, howToApply, officialSource } = body

    if (!schemeName || !provider) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const scheme = await prisma.farmerScheme.create({
      data: {
        schemeName,
        provider,
        eligibility,
        benefits,
        docsRequired,
        howToApply,
        officialSource
      }
    })

    return NextResponse.json({ item: scheme })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create scheme' }, { status: 500 })
  }
}
