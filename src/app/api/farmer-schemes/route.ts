import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: any = {}
    if (category) where.schemeName = { contains: category, mode: 'insensitive' }

    const schemes = await prisma.farmerScheme.findMany({
      where,
      orderBy: { lastUpdated: 'desc' }
    })

    return NextResponse.json({ items: schemes })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
