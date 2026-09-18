import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const items = await prisma.recruitment.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const item = await prisma.recruitment.create({
      data: { ...body, closingDate: body.closingDate ? new Date(body.closingDate) : null, createdAt: new Date() },
    })
    return NextResponse.json({ item })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create recruitment' }, { status: 500 })
  }
}
