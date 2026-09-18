import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const items = await prisma.announcement.findMany({
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
    const item = await prisma.announcement.create({
      data: { ...body, date: body.date ? new Date(body.date) : new Date() },
    })
    return NextResponse.json({ item })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
}
