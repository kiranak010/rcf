import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const item = await prisma.document.create({
      data: { ...body, createdAt: new Date() },
    })
    return NextResponse.json({ item })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 })
  }
}
