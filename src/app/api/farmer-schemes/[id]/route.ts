import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const scheme = await prisma.farmerScheme.findUnique({
      where: { id: params.id }
    })

    if (!scheme) return NextResponse.json({ error: 'Scheme not found' }, { status: 404 })
    return NextResponse.json({ item: scheme })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
