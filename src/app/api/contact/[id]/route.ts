import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.contactEnquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.contactEnquiry.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
