import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}
