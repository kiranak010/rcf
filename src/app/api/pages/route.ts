import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.page.findMany({ orderBy: { updatedAt: 'desc' } })
    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const item = await prisma.page.create({ data: { ...body, updatedAt: new Date() } })
    return NextResponse.json({ item })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
